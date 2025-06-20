import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import type { AppDispatch, RootState } from "../redux/store";

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        🔐 Login
      </h2>

      {["email", "password"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {field}
          </label>
          <input
            type={field === "password" ? "password" : "email"}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
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
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};
