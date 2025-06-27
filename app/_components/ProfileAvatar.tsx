"use client";

import { auth } from '@/configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import React from 'react';
import { useAuthContext } from '../provider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {
  const { user } = useAuthContext();
  const router = useRouter();

  const onButtonPress = () => {
    signOut(auth)
      .then(() => router.replace('/'))
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger className="focus:outline-none">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-blue-500 transition duration-200 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-32 p-2 bg-white dark:bg-neutral-800 shadow-lg rounded-md"
        >
          <Button
            variant="ghost"
            onClick={onButtonPress}
            className="w-full text-sm text-red-600 hover:bg-red-50 dark:hover:bg-neutral-700 transition"
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProfileAvatar;
