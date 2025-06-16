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
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Create Snippet</h2>

      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        placeholder="Title"
        name="title"
        value={snippet.title}
        onChange={handleChange}
      />

      {/* <textarea
        className="w-full mb-3 border px-3 py-2 rounded"
        placeholder="Code"
        name="code"
        onChange={handleChange}
        rows={6}
      /> */}

      <select
        className="w-full mb-3 border px-3 py-2 rounded"
        name="language"
        value={snippet.language}
        onChange={handleDropdownChange}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
      </select>

      <CodeEditor langauge={snippet.language} onChange={handleCodeChange} />

      <button
        type="button"
        onClick={getAISuggestion}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 m-2"
      >
        💡 Suggest with AI
      </button>

      {loadingAI && (
        <p className="text-sm text-gray-500 mt-2">Getting AI suggestion...</p>
      )}
      {suggestion && (
        <div className="mt-4 bg-yellow-100 text-sm p-3 rounded border border-yellow-300">
          <strong>AI Suggestion: (Mock Suggestion)</strong>
          <p>{suggestion}</p>
        </div>
      )}

      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        placeholder="Tags (comma separated)"
        name="tags"
        value={snippet.tags}
        onChange={handleChange}
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="isPublic"
          onChange={handleChange}
          className="mr-2"
        />
        Make Public
      </label>

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Submit Snippet
      </button>
    </form>
  );
};
