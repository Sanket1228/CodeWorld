import type { Snippet } from "./Snippet";

export type SnippetState = {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
  selectedTab: "public" | "self";
};
