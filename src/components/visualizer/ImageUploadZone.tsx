"use client";

import React, { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadZoneProps {
    onImageSelected: (file: File) => void;
    selectedImage: string | null;
    onClear: () => void;
}

export function ImageUploadZone({
    onImageSelected,
    selectedImage,
    onClear,
}: ImageUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                onImageSelected(e.dataTransfer.files[0]);
            }
        },
        [onImageSelected]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelected(e.target.files[0]);
        }
    };

    if (selectedImage) {
        return (
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <img
                    src={selectedImage}
                    alt="Selected room"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onClear}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative w-full aspect-video md:aspect-[4/3] rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer",
                isDragging
                    ? "border-primary-01 bg-primary-01/5 scale-[1.01]"
                    : "border-gray-300 hover:border-primary-01 hover:bg-gray-50 bg-white"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />

            <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <Upload className="w-8 h-8" />
            </div>

            <h3 className="font-heading-05 text-lg text-gray-800 mb-2">
                Upload your room photo
            </h3>
            <p className="font-body-02 text-sm text-gray-500 text-center max-w-xs">
                Drag and drop your image here, or click to browse files
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 font-body-02">
                <ImageIcon className="w-4 h-4" />
                <span>Supports JPG, PNG</span>
            </div>
        </div>
    );
}
