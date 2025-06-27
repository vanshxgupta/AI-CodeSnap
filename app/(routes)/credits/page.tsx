"use client";

import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Credits() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    if (user) GetUserCredits();
  }, [user]);

  const GetUserCredits = async () => {
    const result = await axios.get('/api/user?email=' + user?.email);
    setUserData(result.data);
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-black text-white">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">
        Credit Dashboard
      </h1>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-semibold">Your Available Credits</h2>
          <p className="text-gray-400 text-sm mt-1">
            Use these to convert wireframes to production-ready code.
          </p>
          {userData?.credits !== undefined && (
            <p className="text-2xl font-bold text-purple-400 mt-4">
              {userData.credits} credits remaining
            </p>
          )}
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all shadow-md">
          Buy More Credits
        </Button>
      </div>
    </div>
  );
}

export default Credits;
