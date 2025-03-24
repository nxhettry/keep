"use client";
import { DisplayDataType } from "@/app/data-view";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const NoteDisplay = ({ data }: { data: DisplayDataType }) => {
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const copyContent = () => {
    if (!data) return;

    navigator.clipboard
      .writeText(`${data.title}\n\n${data.content}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg bg-gray-100 text-gray-500 min-h-40">
        <p className="text-lg font-medium">Note not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-12 w-12 bg-gray100 p-2 rounded-full flex items-center justify-center bg-gray-200">
        <IoArrowBackOutline onClick={() => router.back()} size={32} />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
            <button
              onClick={copyContent}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    ></path>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{data.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteDisplay;
