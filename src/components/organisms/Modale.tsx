"use client";

import * as React from "react";

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

export function Modale({
    open,
    onClose,
    title,
    description,
    children,
}: CustomModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="custom-modal-title"
        >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative w-full max-w-lg rounded-md bg-white p-6 shadow-md">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 hover:cursor-pointer focus:outline-none"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                {title && (
                    <h2
                        id="custom-modal-title"
                        className="mb-2 text-lg font-semibold leading-none tracking-tight"
                    >
                        {title}
                    </h2>
                )}
                {description && (
                    <p className="mb-4 text-sm text-muted-foreground">{description}</p>
                )}

                {children}
            </div>
        </div>
    );
}
