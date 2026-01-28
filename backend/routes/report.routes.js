const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/download", (req, res) => {
  const {
    score,
    matchedSkills,
    missingSkills,
    suggestions,
  } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=match-report.pdf"
  );

  doc.pipe(res);

  doc.fontSize(20).text("AI Resume Job Match Report", { underline: true });
  doc.moveDown();

  doc.fontSize(14).text(`Match Score: ${score}%`);
  doc.moveDown();

  doc.fontSize(14).text("Skill Strength:");
  matchedSkills.forEach((skill) => {
    doc.text(`• ${skill}`);
  });

  doc.moveDown();
  doc.fontSize(14).text("Missing Skills:");
  if (missingSkills.length === 0) {
    doc.text("• None 🎉");
  } else {
    missingSkills.forEach((skill) => {
      doc.text(`• ${skill}`);
    });
  }

  doc.moveDown();
  doc.fontSize(14).text("AI Resume Suggestions:");
  suggestions.forEach((s) => {
    doc.text(`• ${s}`);
  });

  doc.moveDown();
  doc.fontSize(10).text(
    `Generated on ${new Date().toLocaleString()}`,
    { align: "right" }
  );

  doc.end();
});

module.exports = router;
