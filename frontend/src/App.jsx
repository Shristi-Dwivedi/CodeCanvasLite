import { useState } from "react";
import "./App.css";

export default function App() {
  const [code, setCode] = useState(`print("Hello World!")`);
  const [output, setOutput] = useState("");
  const [explanation, setExplanation] = useState("");

  const runCode = async () => {
    setOutput("Running...");
    setExplanation("");

    try {
      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.error) {
        setOutput(data.error);
        setExplanation(data.explanation);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setOutput("Error connecting to server");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🧠 CodeCanvas Lite</h1>
      <p className="subtitle">AI-powered coding for beginners</p>

      <div className="editor-card">
        <textarea
          className="editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="run-btn" onClick={runCode}>
          ▶ Run Code
        </button>

        <div className="output-section">
          <h3>📤 Output</h3>
          <pre>{output}</pre>
        </div>

        {explanation && (
          <div className="output-section">
            <h3>🧠 AI Explanation</h3>
            <pre>{explanation}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
