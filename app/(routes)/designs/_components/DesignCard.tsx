import { RECORD } from '@/app/view-code/[uid]/page';
import { Button } from '@/components/ui/button';
import Constants from '@/data/Constants';
import { Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function DesignCard({ item }: { item: RECORD }) {
  const modelObj = item && Constants.AiModelList.find(x => x.name === item?.model);

  return (
    <div className="p-3 sm:p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="w-full mx-auto">
        <Image
          src={item?.imageUrl}
          alt="Generated UI preview"
          width={250}
          height={200}
          className="w-full h-[180px] sm:h-[200px] object-cover rounded-md border border-neutral-700"
        />
      </div>

      <div className="mt-4 space-y-3">
        {/* View Code Button */}
        <div className="text-center">
          <Link href={`/view-code/${item?.uid}`}>
            <Button
              className="text-xs sm:text-sm px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all flex items-center gap-2 mx-auto rounded-md"
              size="sm"
            >
              <Code className="w-4 h-4" />
              View Code
            </Button>
          </Link>
        </div>

        {/* Description */}
        <h2 className="text-xs sm:text-sm text-gray-400 line-clamp-3 text-left px-1">
          {item?.description}
        </h2>

        {/* Model Tag */}
        {modelObj && (
          <div className="flex items-center gap-1 sm:gap-2 bg-neutral-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full w-fit text-white text-[10px] sm:text-xs ml-1 mt-1">
            <Image
              src={modelObj.icon}
              alt={modelObj.modelName ?? ''}
              width={14}
              height={14}
              className="rounded-full"
            />
            <span>{modelObj.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignCard;
