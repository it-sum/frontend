"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">

        <div className="space-y-2">
          <h1 className="text-7xl font-black tracking-tight">
            500
          </h1>

          <h2 className="text-2xl font-semibold">
            Something went wrong
          </h2>

          <p className="text-muted-foreground">
            An unexpected error occurred while loading this page.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition hover:opacity-90"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-lg border px-5 py-2 transition hover:bg-muted"
          >
            Go Home
          </Link>
        </div>

      </div>
    </main>
  );
}