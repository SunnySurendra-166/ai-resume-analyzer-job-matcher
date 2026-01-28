import { useState } from "react";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleMatch = () => {
    // MOCK result (you already have real matching logic)
    setResult({
      score: 75,
      matchedSkills: ["node", "express", "git"],
      missingSkills: ["docker"],
      suggestions: [
        "You are missing DOCKER — consider adding a project or experience demonstrating docker."
      ],
    });
  };

  const downloadPDF = async () => {
    const response = await fetch("http://localhost:5000/api/report/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "match-report.pdf";
    a.click();
  };

  return (
    <div className="container">
      <h1>AI Resume Job Matcher</h1>
      <p className="subtitle">
        Match your resume against any job description instantly
      </p>

      <textarea
        placeholder="Paste resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button className="match-btn" onClick={handleMatch}>
        Match Job
      </button>

      {result && (
        <div className="result-card">
          <h2>Match Score: {result.score}%</h2>

          <h3>Skill Strength</h3>
          {result.matchedSkills.map((s, i) => (
            <p key={i}>{s} – 30%</p>
          ))}

          <h3>Missing Skills</h3>
          {result.missingSkills.map((s, i) => (
            <span key={i} className="missing">{s}</span>
          ))}

          <h3>AI Resume Suggestions</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <button className="download-btn" onClick={downloadPDF}>
            Download Match Report (PDF)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
