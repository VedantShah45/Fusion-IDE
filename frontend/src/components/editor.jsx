import React from "react";
import { Editor } from "@monaco-editor/react";
import * as Y from "yjs"
import {WebrtcProvider} from "y-webrtc"
import {MonacoBinding} from "y-monaco"

export function CodeEditor({ language, onChange }) {
    const editorRef=React.useRef(null);
    function handleEditorDidMount(editor,monaco){
        editorRef.current=editor;
        //initialise YJS
        const doc= new Y.Doc();//a collection of shared objects -> Text
        //connect to peers with Webrtc
        const provider= new WebrtcProvider("test-room",doc);
        const type=doc.getText("monaco");
        //bind yjs to monaco
        const binding= new MonacoBinding(type,editorRef.current.getModel(),new Set([editorRef.current]),provider.awareness)
    }
    return (
        <>
            <Editor height="70vh" theme="vs-dark" width="60vw" language={language} defaultLanguage="cpp" defaultValue="/*Start coding now!!*/" onChange={(value) => onChange(value)} onMount={handleEditorDidMount} />
        </>
    )
}