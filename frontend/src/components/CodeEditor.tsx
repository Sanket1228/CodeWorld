import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export type CodeEditorProps = {
  langauge: string;
  onChange: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => void;
};

export const CodeEditor = ({ langauge, onChange }: CodeEditorProps) => {
  return (
    <div
      style={{ height: "500px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={langauge}
        onChange={onChange}
        defaultValue="// Start coding here..."
        theme="vs-dark"
      />
    </div>
  );
};
