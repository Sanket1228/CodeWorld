import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import type { AppDispatch } from "../redux/store";

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {["email", "password"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block mb-1 capitalize">{field}</label>
          <input
            type={field === "password" ? "password" : "text"}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};
