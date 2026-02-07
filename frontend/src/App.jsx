import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyzeMatch() {
    if (!resumeFile || !jobDescription) {
      alert("Please upload resume and enter job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    const res = await fetch(`${API}/analyze`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  async function downloadReport() {
    const res = await fetch(`${API}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Resume_Match_Report.pdf";
    a.click();
  }

  return (
    <div className="container">
      <h1>AI Resume Job Matcher</h1>
      <p className="subtitle">
        Analyze your resume against a job description using AI
      </p>

      <div className="card">
        <label>Upload Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        <label>Job Description</label>
        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button onClick={analyzeMatch} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </div>

      {result && (
        <div className="result">
          <h2>Match Score</h2>
          <div className="score">{result.matchPercentage}%</div>

          <p>{result.summary}</p>

          <h3>Missing Skills</h3>
          <ul>
            {result.missingSkills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>

          <button className="download" onClick={downloadReport}>
            Download Match Report (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
