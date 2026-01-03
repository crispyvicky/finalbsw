import { NextResponse } from "next/server";
import Replicate from "replicate";

const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

// Rate Limit Configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 Hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour per IP

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    // Clean up old entries if needed (optional optimization)
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    // Reset window if time passed
    if (now - userRecord.lastReset > RATE_LIMIT_WINDOW) {
      userRecord.count = 0;
      userRecord.lastReset = now;
    }

    if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Rate limit exceeded. You can only generate 5 designs per hour." },
        { status: 429 }
      );
    }

    // Increment count
    userRecord.count++;
    rateLimitMap.set(ip, userRecord);

    // 2. Parse Body
    const body = await req.json();
    const { image, style, prompt } = body;

    const replicateToken = process.env.REPLICATE_API_TOKEN;

    // 1. If NO API Key, return Mock Response (Demo Mode)
    if (!replicateToken) {
      console.log("No API Token found. Using Demo Mode.");
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Select mock image based on style for better demo experience
      let mockImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200";
      if (style === "MINIMALIST") mockImage = "https://images.unsplash.com/photo-1598928506311-1555d3c14e6f?q=80&w=1200";
      if (style === "LUXURY") mockImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200";
      if (style === "INDUSTRIAL") mockImage = "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200";

      return NextResponse.json({
        success: true,
        isMock: true,
        image: mockImage,
        message: "Demo Mode: Configure REPLICATE_API_TOKEN to generate real images."
      });
    }

    // 2. If API Key exists, call Replicate
    const replicate = new Replicate({
      auth: replicateToken,
    });

    // Cost & Quality Optimization Constants
    // 1. Steps: 25-30 is the sweet spot for speed vs quality.
    const STEPS = 28;

    // 2. Strength: Controls how much the AI respects the original lines. 
    // 0.5 - 0.6 is balanced. >0.6 can be too rigid, <0.4 can hallucinate.
    const STRENGTH = 0.55;

    // We use ControlNet to preserve the room structure (lines) while changing the style
    // Model: jagilley/controlnet-hough
    const output = await replicate.run(
      "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      {
        input: {
          image: image,
          prompt: `Interior design of a ${style} room, ${prompt || "high quality, photorealistic, 8k, interior design magazine style"}`,
          a_prompt: "best quality, extremely detailed, photo from Pinterest, interior design magazine, cinematic lighting",
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurred, watermark",

          // OPTIMIZED PARAMETERS
          num_inference_steps: STEPS, // Hardcoded cost limit
          strength: STRENGTH,         // Lower strength to avoid heavy processing/drift
          scale: 9,                   // Guidance scale (keep standard)

          num_samples: 1,
          image_resolution: "512",    // Keep 512 for lowest cost (SD1.5). Client sends max 1024.
          detect_resolution: 512,
          value_threshold: 0.1,
          distance_threshold: 0.1,
          seed: Math.floor(Math.random() * 1000000), // Randomize for variety
          eta: 0
        }
      }
    );

    // Replicate returns an array of image URLs
    const generatedUrl = Array.isArray(output) ? output[1] : output;

    return NextResponse.json({
      success: true,
      image: generatedUrl
    });

  } catch (error: any) {
    console.error("AI Generation Error:", error);

    // Handle Replicate Billing Error (402)
    if (error?.response?.status === 402 || error?.message?.includes("Payment Required")) {
      return NextResponse.json(
        { error: "Replicate API Billing Issue: Please add a credit card to your Replicate account to continue." },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate design. Please try again." },
      { status: 500 }
    );
  }
}
