import React from "react";
import { Editor } from "@monaco-editor/react";

export function CodeEditor({ language, onChange }) {
    return (
        <>
            <Editor height="70vh" theme="vs-dark" width="60vw" language={language} defaultLanguage="cpp" defaultValue="/*Start coding now!!*/" onChange={(value) => onChange(value)} />
        </>
    )
}