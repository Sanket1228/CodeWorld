import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { LoginRequest } from "../types/LoginRequest";
import type { UserRequest } from "../types/UserRequest";

const API_URL = `${import.meta.env.VITE_API_END_POINT}/api/auth`;

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }: UserRequest, thunkApi) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response));
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginRequest, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
