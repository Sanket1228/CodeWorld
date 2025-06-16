import { createSlice } from "@reduxjs/toolkit";
import {
  createSnippet,
  fetchSnippets,
  fetchUserSnippet,
} from "../actions/snippetAction";
import type { SnippetState } from "../types/SnippetState";

const initialState: SnippetState = {
  snippets: [],
  loading: false,
  error: null,
};

const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload;
      })
      .addCase(fetchSnippets.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSnippet.fulfilled, (state, action) => {
        state.snippets.push(action.payload);
      })
      .addCase(fetchUserSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload;
      })
      .addCase(fetchUserSnippet.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const snippetReducer = snippetSlice.reducer;
