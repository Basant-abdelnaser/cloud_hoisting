"use client";

import React from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">Error: {error.message}</p>

      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
