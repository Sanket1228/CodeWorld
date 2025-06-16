import { useDispatch, useSelector } from "react-redux";
import {
  fetchSnippets,
  fetchUserSnippet,
} from "../redux/actions/snippetAction";
import type { AppDispatch, RootState } from "../redux/store";
import { DisplayBox } from "./DisplayBox";

export const SnippetList = ({ snippets }: { snippets: any[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handlePublicClick = () => {
    dispatch(fetchSnippets());
  };

  const handleMySnippetsClick = () => {
    dispatch(fetchUserSnippet());
  };

  return (
    <>
      <div className="flex gap-2 w-[300px] h-[50px]">
        <button onClick={handlePublicClick}>Public</button>
        <DisplayBox display={!!user}>
          <button onClick={handleMySnippetsClick}>My Snippets</button>
        </DisplayBox>
      </div>
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        {snippets.map((s, idx) => (
          <div key={idx} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">{s.code}</pre>
            <p className="text-xs text-gray-600 mt-1">
              Language: {s.language} • Tags: {s.tags?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
