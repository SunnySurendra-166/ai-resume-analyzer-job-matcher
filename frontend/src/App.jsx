import { useState } from "react";
import "./App.css";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDesc);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analyze`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Backend may be sleeping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Resume Job Matcher</h1>
      <p>Upload your resume and job description</p>

      {/* Resume Upload */}
      <div className="card">
        <h3>Your Resume (PDF)</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        {resumeFile && <p>{resumeFile.name}</p>}
      </div>

      {/* Job Description */}
      <div className="card">
        <h3>Job Description</h3>
        <textarea
          rows="6"
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>

      {/* Analyze Button */}
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Result */}
      {result && (
        <div className="result">
          <h2>Match Score: {result.matchScore}%</h2>

          <h3>Skill Strength</h3>
          {Object.entries(result.skillStrength || {}).map(([skill, value]) => (
            <p key={skill}>
              {skill}: {value}%
            </p>
          ))}

          <h3>Missing Skills</h3>
          {result.missingSkills?.length > 0 ? (
            result.missingSkills.map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))
          ) : (
            <p>None 🎉</p>
          )}

          <h3>AI Suggestions</h3>
          <ul>
            {result.suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
