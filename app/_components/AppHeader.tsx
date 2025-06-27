'use client';

import React, { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ProfileAvatar from './ProfileAvatar';
import Image from 'next/image';

interface AppHeaderProps {
  hideSidebar?: boolean;
}

function AppHeader({ hideSidebar = false }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure client-only render for consistency
    setMounted(true);
  }, []);

  return (
    <header className="relative px-6 py-4 bg-black text-white shadow-md border-b border-neutral-800 flex items-center justify-between w-full z-50">
      
      {!hideSidebar ? (
        <>
          <SidebarTrigger />

          {/* Render after hydration to prevent mismatch */}
          {mounted && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h2 className="font-bold text-xl sm:text-2xl text-center bg-gradient-to-r from-sky-400 to-cyan-200 text-transparent bg-clip-text tracking-wide">
                Creativity to Code
              </h2>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="CodeSnap Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
          <div className="leading-tight">
            <h1 className="text-2xl font-bold tracking-tight  text-white">
              CodeSnap
            </h1>
            <p className="text-sm font-medium text-neutral-400  uppercase tracking-widest">
              Design ➜ Code
            </p>
          </div>
        </div>
      )}

      <ProfileAvatar />
    </header>
  );
}

export default AppHeader;
