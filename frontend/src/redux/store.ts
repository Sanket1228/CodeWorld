import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { snippetReducer } from "./reducers/snippetReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snippet: snippetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
