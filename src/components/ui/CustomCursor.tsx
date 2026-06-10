"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on client with fine pointer (mouse)
        if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
            if (followerRef.current) {
                // slight delay/lag for the follower is handled by CSS transition or RAF, 
                // but for high performance simple direct tracking with CSS transition is easiest for "follower" effect
                followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const onMouseDown = () => {
            if (cursorRef.current) cursorRef.current.style.transform += " scale(0.8)";
            if (followerRef.current) followerRef.current.style.transform += " scale(0.8)";
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target or its parent is clickable
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.tagName === "INPUT" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("clickable") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseover", onMouseOver);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseover", onMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 w-3 h-3 bg-[#A0A0A0] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform",
                    isHovering && "scale-0" // Hide dot on hover, let follower take over or scale up
                )}
            />

            {/* Follower Ring */}
            <div
                ref={followerRef}
                className={cn(
                    "fixed top-0 left-0 w-8 h-8 border border-[#0F2557] rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform opacity-60",
                    isHovering && "w-16 h-16 bg-[#0F2557]/20 border-[#A0A0A0] border-2 opacity-100"
                )}
            />
        </>
    );
};
