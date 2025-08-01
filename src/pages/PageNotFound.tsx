// src/pages/NotFound.tsx
import React from "react";

export default function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Page Not Found</p>
            <a
                href="/"
                className="text-blue-600 underline hover:text-blue-800 transition"
            >
                Go back home
            </a>
        </div>
    );
}
