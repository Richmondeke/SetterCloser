import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0b0b0b] min-h-screen flex items-center justify-center relative">
      {/* Home link — top left */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#ffffff] hover:opacity-80 transition"
      >
        <Image src="/favicon.png" alt="SetterCloser" width={20} height={20} />
        <span className="text-[15px] font-medium tracking-[-0.2px]">
          SetterCloser
        </span>
      </Link>

      <div className="max-w-md w-full px-4">{children}</div>
    </div>
  );
}
