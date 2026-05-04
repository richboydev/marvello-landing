import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{ background: "var(--bg)", padding: "2rem" }}
    >
      <p
        className="font-serif text-[80px] font-normal"
        style={{ color: "var(--gold)", lineHeight: 1 }}
      >
        404
      </p>
      <h1
        className="font-serif text-[32px] font-normal mt-4 mb-4"
        style={{ color: "var(--text)" }}
      >
        Page not found
      </h1>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/uz"
        className="px-8 py-3.5 rounded-[8px] text-[12px] font-semibold tracking-[1.5px] uppercase transition-all duration-300"
        style={{ background: "var(--brown)", color: "#EADFCF" }}
      >
        Go Home
      </Link>
    </div>
  );
}
