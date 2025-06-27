import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        `w-full 
         min-h-[100px]
         rounded-lg 
         border 
         border-neutral-700 
         bg-neutral-900 
         px-4 
         py-3 
         text-sm 
         text-white 
         placeholder-gray-400 
         resize-none 
         shadow-inner 
         focus:outline-none 
         focus:ring-2 
         focus:ring-blue-600 
         focus:border-blue-600 
         transition 
         duration-200 
         ease-in-out 
         disabled:opacity-50 
         disabled:cursor-not-allowed`,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
