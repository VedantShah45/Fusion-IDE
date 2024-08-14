import React, { useState } from "react";
import { CodeEditor } from "../components/editor";
import '../style.css'
import { Select } from '@chakra-ui/react'
import axios from 'axios'

export function Codepage() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    let token;
    const runCode = async () => {
        try {
            let rawCode = JSON.stringify(code);
            console.log(rawCode);
            const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false', {
                source_code: JSON.stringify(code),
                language_id: 54,
                stdin: ""
            }, {
                headers: {
                    'X-RapidAPI-Key': '1411219de0msh524dab4d2a02e57p1ea093jsne493fec6e690',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                token = response.data.token;
            }
        } catch (error) {
            console.error(error);
        }
    }
    const showOutput = async () => {
        try {
            const response = await axios.get(`https://ce.judge0.com/submissions/${token}?base64_encoded=false`);
            if (response) {
                console.log(response.data.stdout);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex h-lvh flex-row">
            <div className="flex flex-col ">
                <div className="h-14 flex items-center justify-around bg-slate-800 text-white px-4">
                    <div>
                        <h1>Fusion-IDE</h1>
                    </div>
                    <div>
                        <Select placeholder='Select language' className="text-black" onChange={event => setLanguage(event.target.value)}>
                            <option value='cpp' className="text-black">C++</option>
                            <option value='c' className="text-black">C</option>
                            <option value='java' className="text-black">Java</option>
                            <option value='javascript' className="text-black">JavaScript</option>
                            <option value='python' className="text-black">Python</option>
                            <option value='typescript' className="text-black">Typescript</option>
                            <option value='csharp' className="text-black">C#</option>
                            <option value='html' className="text-black">HTML</option>
                            <option value='css' className="text-black">CSS</option>
                            <option value='swift' className="text-black">Swift</option>
                            <option value='kotlin' className="text-black">Kotlin</option>
                            <option value='go' className="text-black">Go</option>
                            <option value='ruby' className="text-black">Ruby</option>
                            <option value='php' className="text-black">PHP</option>
                            <option value='markdown' className="text-black">Markdown</option>
                            <option value='rust' className="text-black">Rust</option>
                        </Select>
                    </div>
                    <button onClick={runCode}>Compile Code</button>
                    <button onClick={showOutput}>Run Code</button>
                </div>
                <CodeEditor language={language} onChange={handleCodeChange} />
                <textarea className="p-2 h-60" type="text" name="input" placeholder="Enter input here" />
            </div>
            <div className="bg-slate-500 h-full w-full flex flex-col items-center">
                <label className="text-white " htmlFor="output">Output Screen</label>
                <textarea id="output" className="bg-slate-200 p-2 h-full w-full" type="text" name="output" />
            </div>
        </div>
    )
}