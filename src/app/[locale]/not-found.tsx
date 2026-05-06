import { Link } from "@/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-title text-5xl text-shh-green">404</h1>
      <p className="font-body text-shh-black">Page not found.</p>
      <Link href="/" className="font-body underline hover:text-shh-green">
        Return home
      </Link>
    </div>
  );
}
