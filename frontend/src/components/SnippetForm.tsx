import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSnippet } from "../redux/actions/snippetAction";
import type { AppDispatch, RootState } from "../redux/store";
import { CodeEditor } from "./CodeEditor";

export const SnippetForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    language: "javascript",
    tags: "",
    isPublic: false,
  });
  const [suggestion, setSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const loading = useSelector((state: RootState) => state.snippet.loading);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSnippet({ ...snippet, [name]: type === "checkbox" ? checked : value });
  };

  const handleCodeChange = (e: any) => {
    setSnippet({ ...snippet, code: e });
  };

  const handleDropdownChange = (e: any) => {
    setSnippet({ ...snippet, language: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user) {
      return alert("You should logged in first");
    }

    const payload = {
      ...snippet,
      tags: snippet.tags.split(",").map((tag) => tag.trim()),
      userId: user.id,
    };
    dispatch(createSnippet(payload));
    setSnippet({
      title: "",
      code: "",
      language: "",
      tags: "",
      isPublic: false,
    });
  };

  const getAISuggestion = async () => {
    if (!snippet.code) return alert("Enter some code first!");
    setLoadingAI(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/suggest", {
        code: snippet.code,
      });
      setSuggestion(res.data.suggestion);
    } catch (err: any) {
      console.error("OpenAI Error:", err.response?.data || err.message || err);
      alert("Failed to fetch AI suggestion.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-12 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        📝 Create a New Snippet
      </h2>

      {/* Title Input */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={snippet.title}
          onChange={handleChange}
          placeholder="Enter snippet title"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Language Dropdown */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="language"
        >
          Language
        </label>
        <select
          id="language"
          name="language"
          value={snippet.language}
          onChange={handleDropdownChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* Code Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code
        </label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <CodeEditor langauge={snippet.language} onChange={handleCodeChange} />
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={getAISuggestion}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          💡 Suggest with AI
        </button>
        {loadingAI && (
          <p className="text-sm text-gray-500">Getting AI suggestion...</p>
        )}
      </div>

      {suggestion && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="font-medium text-yellow-700">💡 AI Suggestion:</p>
          <p className="text-sm text-yellow-800 mt-1">{suggestion}</p>
        </div>
      )}

      {/* Tags */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="tags"
        >
          Tags
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={snippet.tags}
          onChange={handleChange}
          placeholder="e.g. react, hooks, fetch"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Public Checkbox */}
      <div className="flex items-center">
        <input
          id="isPublic"
          name="isPublic"
          type="checkbox"
          onChange={handleChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
          Make Public
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
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
                d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          "🚀 Submit Snippet"
        )}
      </button>
    </form>
  );
};
