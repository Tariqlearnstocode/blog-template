'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console / Vercel logs for debugging.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] grid place-items-center px-6 text-center">
      <div className="max-w-md">
        <div className="text-sm font-medium uppercase tracking-wider text-accent">
          Something went wrong
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-ink">That didn&apos;t load right</h1>
        <p className="mt-3 text-ink-2">
          A hiccup on our end. Try again in a moment.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-full bg-gradient-accent text-white font-medium shadow-md shadow-accent/25 hover:scale-105 transition-transform"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full border border-border text-ink font-medium hover:bg-border/30 transition"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
