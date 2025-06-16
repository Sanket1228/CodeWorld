import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { Snippet } from "../types/Snippet";

const API_URL = "http://localhost:5000/api/snippets";

// Fetch snippets
export const fetchSnippets = createAsyncThunk(
  "snippet/fetchSnippets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// fetch user snippet
export const fetchUserSnippet = createAsyncThunk(
  "snippet/fetchSnippet",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        "http://localhost:5000/api/snippets/me",
        config
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Create snippet
export const createSnippet = createAsyncThunk(
  "snippet/createSnippet",
  async (snippetData: Snippet, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(API_URL, snippetData, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
