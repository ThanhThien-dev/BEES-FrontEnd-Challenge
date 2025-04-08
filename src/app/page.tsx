import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-gray-900 p-8 pt-0 min-h-screen text-white text-center">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logo.png"
          alt="BEES Group Logo"
          width={200}
          height={100}
          priority
        />
      </div>

      {/* Nội dung giới thiệu */}
      <h1 className="mb-4 font-bold text-4xl animate-fade-in">
        Frontend Developer Hiring Test
      </h1>
      <p className="opacity-80 mb-6 max-w-lg text-lg">
        Unlocking the limitless opportunities within our APAC/VIETNAM ecosystem.
      </p>

      {/* Nút dẫn đến trang Users */}
      <Link href="/users">
        <button className="bg-yellow-500 hover:bg-yellow-400 shadow-md px-6 py-3 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform cursor-pointer transform">
          Let's Started →
        </button>
      </Link>
    </main>
  );
}
