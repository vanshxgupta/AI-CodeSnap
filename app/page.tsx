"use client";
import Image from "next/image";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="w-full bg-black px-6 py-4 shadow-md z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-xl font-bold tracking-tight">CodeSnap</h2>
          </div>
          <div>
            {!user?.email ? (
              <Authentication>
                <Button variant="ghost" className="text-white hover:text-blue-400">
                  Start Building
                </Button>
              </Authentication>
            ) : (
              <ProfileAvatar />
            )}
          </div>
        </nav>
      </header>


      <section className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight">
            Code
            <span className="bg-gradient-to-tr from-blue-600 to-green-600 bg-clip-text text-transparent">
              Snap
            </span>
          </h1>

          <h2 className="text-md md:text-lg lg:text-xl font-medium mt-2 text-gray-400">
            Visual to Code Converter
          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Accelerate your UI development with CodeSnap — an AI-powered platform that instantly
            transforms wireframes into clean, production-ready code.
          </p>

          <div className="mt-8 flex justify-center">
            {user?.email ? (
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-gradient-to-tr from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium shadow-md transition"
              >
                Start Building
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ) : (
              <Authentication>
                <Button className="bg-gradient-to-tr from-blue-600 to-green-600 text-white">
                  Start Building
                </Button>
              </Authentication>
            )}
          </div>
        </div>
      </section>

          
      <section className="w-full px-4 sm:px-6 lg:px-8 mt-4 mb-12">
        <div className="max-w-3xl mx-auto bg-black/80 border border-neutral-800 px-6 py-4 rounded-xl shadow-md text-center backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <h1 className="text-2xl sm:text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              UI DESIGN
            </h1>
            <span className="text-xl sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-yellow-200 to-red-500 bg-clip-text text-transparent">TO</span>
            <h1 className="text-2xl sm:text-xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              CODE
            </h1>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/IMAG.png"
            alt="CodeSnap"
            width={1100}
            height={700}
            className="w-full object-contain rounded-md shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
