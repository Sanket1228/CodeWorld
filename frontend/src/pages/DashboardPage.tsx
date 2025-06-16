import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnippetList } from "../components/SnippetList";
import { fetchSnippets } from "../redux/actions/snippetAction";
import type { AppDispatch, RootState } from "../redux/store";

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const snippets = useSelector((state: RootState) => state.snippet.snippets);
  //TODO: work on loading part

  useEffect(() => {
    dispatch(fetchSnippets());
  }, []);

  return (
    <div>
      <SnippetList snippets={snippets} />
    </div>
  );
};
