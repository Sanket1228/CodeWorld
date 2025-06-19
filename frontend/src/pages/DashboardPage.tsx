import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SnippetList } from "../components/SnippetList";
import { fetchSnippets } from "../redux/actions/snippetAction";
import type { AppDispatch } from "../redux/store";

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSnippets());
  }, []);

  return (
    <div>
      <SnippetList />
    </div>
  );
};
