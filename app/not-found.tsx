import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">

      <div className="flex max-w-md flex-col items-center gap-6 text-center">

        <div className="space-y-2">

          <h1 className="text-8xl font-black tracking-tight">
            404
          </h1>

          <h2 className="text-2xl font-semibold">
            Page Not Found
          </h2>

          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

        </div>

        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition hover:opacity-90"
        >
          Back to Home
        </Link>

      </div>

    </main>
  );
}