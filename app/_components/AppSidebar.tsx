'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import {
  Home,
  Paintbrush,
  CircleDollarSign,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Studio',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Designs',
    url: '/designs',
    icon: Paintbrush,
  },
  {
    title: 'Billing & Credits',
    url: '/credits',
    icon: CircleDollarSign,
  },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="bg-black text-white border-r border-neutral-800 min-h-screen shadow-lg">
      {/* Sidebar Header with logo linking to homepage */}
      <SidebarHeader>
        <div className="p-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CodeSnap Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <h2 className="text-lg font-extrabold tracking-wide text-white">
                CodeSnap
              </h2>
              <p className="text-[11px] text-neutral-400 tracking-wide">
                Transform Ideas into Interfaces
              </p>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      {/* Navigation Links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 px-3 space-y-1">
              {navItems.map((item, index) => {
                const isActive = path === item.url;
                return (
                  <Link key={index} href={item.url} passHref>
                    <div
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
