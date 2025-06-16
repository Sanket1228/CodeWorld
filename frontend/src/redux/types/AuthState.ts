import type { User } from "./User";

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};
