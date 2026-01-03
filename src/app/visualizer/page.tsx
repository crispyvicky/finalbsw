"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2 } from "lucide-react";
import { ImageUploadZone } from "@/components/visualizer/ImageUploadZone";
import { StyleSelector, DesignStyle } from "@/components/visualizer/StyleSelector";
import { Button } from "@/components/ui/button";


const MOCK_RESULTS: Record<DesignStyle, string> = {
    MODERN: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    MINIMALIST: "https://images.unsplash.com/photo-1598928506311-1555d3c14e6f?q=80&w=1200&auto=format&fit=crop",
    LUXURY: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    INDUSTRIAL: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop",
    SCANDINAVIAN: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
    BOHEMIAN: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
};

export default function VisualizerPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<DesignStyle>("MODERN");
    const [customPrompt, setCustomPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSelect = (file: File) => {
        // Create local preview URL
        const url = URL.createObjectURL(file);
        setSelectedImage(url);
        setSelectedFile(file);
    };

    const processImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Resize logic: Max dimension 1024px
                    const MAX_SIZE = 1024;
                    if (width > MAX_SIZE || height > MAX_SIZE) {
                        if (width > height) {
                            height = Math.round((height * MAX_SIZE) / width);
                            width = MAX_SIZE;
                        } else {
                            width = Math.round((width * MAX_SIZE) / height);
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG at 80% quality
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas to Blob failed"));
                    }, 'image/jpeg', 0.8);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleGenerate = async () => {
        if (!selectedFile) return;

        setIsGenerating(true);
        setGeneratedImage(null);

        try {
            // 1. Resize & Compress Image
            const processedBlob = await processImage(selectedFile);

            // 2. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', processedBlob);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) throw new Error("Image upload failed");
            const uploadData = await uploadRes.json();
            const imageUrl = uploadData.url;

            // 3. Call Visualize API with URL
            const response = await fetch('/api/visualize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: imageUrl, // Send URL instead of base64
                    style: selectedStyle,
                    prompt: customPrompt
                })
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || "Failed to generate design");
            }

            setGeneratedImage(data.image);
            setStep(2);

        } catch (error) {
            console.error("Generation failed:", error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            alert(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetAll = () => {
        setSelectedImage(null);
        setSelectedFile(null);
        setGeneratedImage(null);
        setCustomPrompt("");
        setStep(1);
        setIsGenerating(false);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-secondary-05 border-b border-gray-100">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link
                        href="/portfolio"
                        className="flex items-center gap-2 text-gray-500 hover:text-primary-01 transition-colors text-sm uppercase tracking-widest font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-2 text-primary-01">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-heading-04 font-bold tracking-wide">AI INTERIOR CREATOR</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {step === 1 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Left Column: Input */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="font-heading-02 text-4xl lg:text-5xl text-primary-01 mb-4">
                                    Reimagine Your Space
                                </h1>
                                <p className="font-body-02 text-secondary-01 text-lg">
                                    Upload a photo of your room and watch our AI transform it into a masterpiece in seconds.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                                        1. Upload Photo
                                    </h3>
                                    <ImageUploadZone
                                        selectedImage={selectedImage}
                                        onImageSelected={handleImageSelect}
                                        onClear={() => setSelectedImage(null)}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                                        2. Select Style
                                    </h3>
                                    <StyleSelector
                                        selectedStyle={selectedStyle}
                                        onSelect={setSelectedStyle}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                                        3. Additional Requirements (Optional)
                                    </h3>
                                    <textarea
                                        value={customPrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        placeholder="E.g. I want a blue sofa, lots of plants, and warm lighting..."
                                        className="w-full h-32 p-4 rounded-lg border-2 border-gray-200 focus:border-primary-01 focus:ring-0 resize-none font-body-02 text-gray-700 placeholder:text-gray-400"
                                    />
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={!selectedImage || isGenerating}
                                    className="w-full h-14 bg-primary-01 hover:bg-[#2F4F2F] text-white text-lg font-medium uppercase tracking-widest rounded-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Designing...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-5 h-5" />
                                            Generate Design
                                        </>
                                    )}
                                </Button>
                                {selectedImage && !isGenerating && (
                                    <p className="text-center text-xs text-gray-400 font-body-02">
                                        * This is a demo. No real API costs will be incurred yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Preview/Hero Image */}
                        <div className="hidden lg:block relative h-full min-h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                                alt="Inspiration"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
                                <div className="text-white">
                                    <p className="font-heading-04 text-3xl mb-2">"The AI tool helped me visualize exactly what I wanted before we even started."</p>
                                    <p className="font-body-02 text-white/80">— Sarah J., Hyderabad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Step 2: Results */
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="font-heading-03 text-3xl md:text-4xl text-primary-01 mb-4">
                                Here is your new {selectedStyle.toLowerCase()} room
                            </h2>
                            <p className="font-body-02 text-secondary-01">
                                Like what you see? Save it or try another style.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <span className="block text-center text-xs font-bold uppercase tracking-widest text-gray-400">Original</span>
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                    <img src={selectedImage!} alt="Original" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="block text-center text-xs font-bold uppercase tracking-widest text-primary-01">AI Generated Design</span>
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-xl border-2 border-primary-01/20 relative group">
                                    <img src={generatedImage!} alt="Generated" className="w-full h-full object-cover" />

                                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded shadow-lg hover:bg-gray-100">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 pt-8">
                            <Button
                                onClick={() => setStep(1)}
                                variant="outline"
                                className="h-12 px-8 border-gray-300 text-gray-600 hover:text-primary-01 hover:border-primary-01"
                            >
                                TRY ANOTHER STYLE
                            </Button>
                            <Button
                                onClick={resetAll}
                                className="h-12 px-8 bg-primary-01 hover:bg-[#2F4F2F] text-white"
                            >
                                UPLOAD NEW PHOTO
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
