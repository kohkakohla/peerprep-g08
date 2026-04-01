// components/CollabEditor.tsx
import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface CollabEditorProps {
  language?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function CollabEditor({
  language = "python",
  value = "",
  onChange,
  readOnly = false,
}: CollabEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Focus editor on mount
    editor.focus();

    // Resize observer so editor fills its container when layout changes
    const ro = new ResizeObserver(() => editor.layout());
    const node = editor.getContainerDomNode();
    if (node.parentElement) ro.observe(node.parentElement);

    return () => ro.disconnect();
  };

  // Sync language changes without remounting
  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) {
      editor.setModelLanguage(model, language); // ← needs monaco instance
    }
  }, [language]);

  return (
    <Editor
      height="100%"
      width="100%"
      language={language}
      value={value}
      theme="vs-dark"
      onMount={handleMount}
      onChange={(val) => onChange?.(val ?? "")}
      options={{
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: false, // handled manually via ResizeObserver
        tabSize: 2,
        wordWrap: "on",
        lineNumbers: "on",
        renderLineHighlight: "gutter",
        smoothScrolling: true,
        cursorBlinking: "smooth",
        padding: { top: 12, bottom: 12 },
      }}
    />
  );
}
