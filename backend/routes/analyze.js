import express from "express";
import multer from "multer";
import { analyzeSkills } from "../services/skillAnalyzer.js";
import { generatePDF } from "../services/pdfGenerator.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = req.body.resumeText || "";
    const jobText = req.body.jobText || "";

    const result = analyzeSkills(resumeText, jobText);

    if (req.query.download === "pdf") {
      const pdfBuffer = await generatePDF(result);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=match-report.pdf");
      return res.send(pdfBuffer);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;
