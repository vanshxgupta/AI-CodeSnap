"use client";
import { useAuthContext } from '@/app/provider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DesignCard from './_components/DesignCard';
import { RECORD } from '@/app/view-code/[uid]/page';
import { Loader2 } from 'lucide-react';

function Designs() {
  const { user } = useAuthContext();
  const [wireframeList, setWireframeList] = useState<RECORD[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) GetAllUserWireframe();
  }, [user]);

  const GetAllUserWireframe = async () => {
    try {
      const result = await axios.get(`/api/wireframe-to-code?email=${user?.email}`);
      setWireframeList(result.data);
    } catch (error) {
      console.error("Error fetching wireframes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-6">Designs & Code</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
      ) : wireframeList.length === 0 ? (
        <div className="text-center text-gray-400 font-medium py-10">
          No designs yet
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 mt-4">
          {wireframeList.map((item, index) => (
            <DesignCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Designs;
