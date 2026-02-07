import express from "express";
import cors from "cors";
import multer from "multer";
import pdf from "pdf-parse";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

/* Health check */
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

/* ✅ ROUTE 1: Parse Resume */
app.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    const data = await pdf(req.file.buffer);
    const text = data.text?.trim();

    if (!text) {
      return res.status(500).json({ error: "Failed to extract text" });
    }

    res.json({ text });
  } catch (err) {
    console.error("PDF parse error:", err);
    res.status(500).json({ error: "Resume parsing failed" });
  }
});

/* ✅ ROUTE 2: Analyze */
app.post("/analyze", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res
      .status(400)
      .json({ error: "Resume text or Job Description missing" });
  }

  // Simple score logic (safe & stable)
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jdWords = jobDescription.toLowerCase().split(/\s+/);

  const matched = jdWords.filter(w => resumeWords.includes(w));
  const score = Math.min(100, Math.round((matched.length / jdWords.length) * 100));

  res.json({
    matchPercentage: score,
    summary: `Resume matches the job description with ${score}% relevance.`
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
