import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="editorial-container flex min-h-[70vh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="text-micro uppercase tracking-label text-stone">404</p>
      <h1 className="mt-3 text-[2rem] font-medium tracking-tightest sm:text-[3rem]">
        Project not found
      </h1>
      <Link
        href="/"
        data-cursor="link"
        className="mt-8 text-micro uppercase tracking-label text-ink underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  );
}
