"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "@/app/provider";
import axios from "axios";
import uuid4 from "uuid4";

import {
  Loader2 as LoaderIcon,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Constants from "@/data/Constants";

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const router = useRouter();

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      setFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const OnConvertToCode = async () => {
    if (!file || !model || !description) {
      toast("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.secure_url) {
        toast("Image upload failed.");
        setLoading(false);
        return;
      }

      const imageUrl = uploadData.secure_url;
      const uid = uuid4();

      const result = await axios.post("/api/wireframe-to-code", {
        uid,
        description,
        imageUrl,
        model,
        email: user?.email,
      });

      if (result.data?.error) {
        toast("You don’t have enough credits.");
        setLoading(false);
        return;
      }

      router.push(`/view-code/${uid}`);
    } catch (error) {
      toast("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 sm:px-10 lg:px-20 py-10 bg-black text-white">
      <h1 className="text-3xl font-bold mb-10 text-center tracking-wider">
        Convert Your UI Design to Code Instantly
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* AI Model Selection */}
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full bg-neutral-800 border border-gray-700 text-white">
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-gray-700 text-white">
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem
                  key={index}
                  value={model.name}
                  className="flex items-center gap-4 py-2 px-3 hover:bg-neutral-800"
                >
                  <Image
                    src={model.icon}
                    alt={model.name}
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Upload Your Design</h2>
          {!previewUrl ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              {/* Custom Upload Icon (inline SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
              <p className="text-gray-400 text-sm">
                Upload a wireframe or UI image to convert it into clean, responsive code.
              </p>
              <label
                htmlFor="imageSelect"
                className="cursor-pointer bg-gradient-to-r from-cyan-400 to-cyan-700 hover:bg-cyan-900 text-white px-5 py-2 rounded-md text-sm"
              >
                Select Image
              </label>
              <input
                id="imageSelect"
                type="file"
                onChange={OnImageSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <Image
                src={previewUrl}
                alt="Preview"
                width={500}
                height={300}
                className="w-full max-h-64 object-contain rounded-md border border-neutral-700"
              />
              <button
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-1"
                onClick={() => setPreviewUrl(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Brief Description</h2>
          <Textarea
            placeholder="e.g., Modern login page with email and password, responsive for mobile and desktop..."
            className="bg-neutral-800 border border-gray-700 text-white h-40 resize-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Convert Button */}
        <div className="text-center pt-4">
          <Button
            onClick={OnConvertToCode}
            disabled={loading}
            className="bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-md text-sm font-medium shadow-lg transition-all flex items-center justify-center"
          >
            {loading ? (
              <LoaderIcon className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Generate Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
