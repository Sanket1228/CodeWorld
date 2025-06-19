import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSnippets,
  fetchUserSnippet,
} from "../redux/actions/snippetAction";
import type { AppDispatch, RootState } from "../redux/store";
import { DisplayBox } from "./DisplayBox";

export const SnippetList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const selectedTab = useSelector(
    (state: RootState) => state.snippet.selectedTab
  );

  const snippets = useSelector((state: RootState) => state.snippet.snippets);

  const loading = useSelector((state: RootState) => state.snippet.loading);

  const error = useSelector((state: RootState) => state.snippet.error);

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (code: string, idx: any) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000); // Clear after 2s
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handlePublicClick = () => {
    dispatch(fetchSnippets());
  };

  const handleMySnippetsClick = () => {
    dispatch(fetchUserSnippet());
  };

  return (
    <>
      {/* Sticky Buttons (Full Width) */}
      <div className="sticky top-20 z-40 w-full bg-gray-100 border-b">
        <div className="flex gap-2 px-4 py-2 max-w-6xl mx-auto">
          <button
            onClick={handlePublicClick}
            className={`px-4 py-2 rounded-md shadow transition font-medium
        ${
          selectedTab === "public"
            ? "bg-blue-600 text-white"
            : "bg-transparent text-blue-600 hover:bg-blue-100"
        }`}
          >
            Public
          </button>

          <DisplayBox display={!!user}>
            <button
              onClick={handleMySnippetsClick}
              className={`px-4 py-2 rounded-md shadow transition font-medium
          ${
            selectedTab === "self"
              ? "bg-blue-600 text-white"
              : "bg-transparent text-blue-600 hover:bg-blue-100"
          }`}
            >
              My Snippets
            </button>
          </DisplayBox>
        </div>
      </div>

      <DisplayBox display={!loading && snippets?.length > 0}>
        {/* Scrollable Page Content */}
        <div className="max-w-6xl mx-auto mt-8 px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {snippets.map((s, idx) => (
            <div
              key={idx}
              className="group p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {s.title}
              </h3>

              {/* Code Block with Copy Button */}
              <pre className="relative bg-[#1e1e2f] text-white text-sm rounded-lg p-4 mt-4 overflow-x-auto font-mono leading-relaxed border border-gray-700 shadow-inner">
                <code className="whitespace-pre-wrap block">{s.code}</code>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(s.code, idx)}
                  className="absolute top-2 right-2 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md transition"
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </pre>

              <div className="mt-4 text-xs text-gray-600 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {s.language}
                </span>
                {s.tags?.map((tag: string, i: any) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DisplayBox>

      <DisplayBox display={!loading && snippets?.length === 0}>
        <div className="flex items-center justify-center h-60 flex-col gap-3 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zm-.75 3.75a2.25 2.25 0 01-3.75 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-semibold">No snippets found</p>
          <p className="text-sm">
            Try creating a new snippet or checking another tab.
          </p>
        </div>
      </DisplayBox>

      <DisplayBox display={loading}>
        <div className="flex items-center justify-center h-60 flex-col gap-4 text-gray-600">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-sm">Loading snippets...</p>
        </div>
      </DisplayBox>

      <DisplayBox display={!!error}>
        <div className="flex items-center justify-center h-60 flex-col gap-4 text-red-600">
          <div className="text-center">
            <p className="text-lg font-semibold">Something went wrong</p>
            <p className="text-sm text-red-500 mt-1">
              Failed to load snippets. Please try again.
            </p>
          </div>
        </div>
      </DisplayBox>
    </>
  );
};
