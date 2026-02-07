import express from "express";
import cors from "cors";
import multer from "multer";
import PDFDocument from "pdfkit";
import { extractTextFromPDF } from "./utils/pdf.js";
import { analyzeResume } from "./utils/analyze.js";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || "";
    let resumeText = req.body.resumeText || "";

    if (req.file) {
      resumeText = await extractTextFromPDF(req.file.buffer);
    }

    const result = analyzeResume(resumeText, jobDescription);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/download", (req, res) => {
  const { matchPercentage, summary, missingSkills } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=match-report.pdf");

  doc.pipe(res);
  doc.fontSize(20).text("AI Resume Match Report\n\n");
  doc.fontSize(14).text(`Match Score: ${matchPercentage}%\n\n`);
  doc.text(summary + "\n\n");
  doc.text("Missing Skills:\n");
  missingSkills.forEach(s => doc.text("- " + s));
  doc.end();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
