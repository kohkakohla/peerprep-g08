import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import useYjs from "../hooks/useYjs";

interface CollabEditorProps {
  roomId: string;
  language?: string;
  readOnly?: boolean;
}

export default function CollabEditor({
  roomId,
  language = "python",
  readOnly = false,
}: CollabEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { ydoc, wsProvider } = useYjs(roomId);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    const yText = ydoc.getText("content");
    const model = editor.getModel();
    const binding = new MonacoBinding(
      yText,
      model!,
      new Set([editor]),
      wsProvider.awareness,
    );

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
      editor.setModelLanguage(model, language);
    }
  }, [language]);

  return (
    <Editor
      height="100%"
      width="100%"
      language={language}
      theme="vs-dark"
      onMount={handleMount}
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
