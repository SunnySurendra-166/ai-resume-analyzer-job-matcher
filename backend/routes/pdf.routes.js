const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/download", (req, res) => {
  const { score, skillStrength, missingSkills, suggestions } = req.body;

  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=match-report.pdf");

  doc.pipe(res);

  doc.fontSize(22).text("AI Resume Job Match Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(16).text(`Match Score: ${score}%`);
  doc.moveDown();

  doc.fontSize(14).text("Skill Strength:");
  Object.entries(skillStrength).forEach(([skill, value]) => {
    doc.text(`• ${skill}: ${value}%`);
  });

  doc.moveDown();
  doc.fontSize(14).text("Missing Skills:");
  missingSkills.length === 0
    ? doc.text("• None 🎉")
    : missingSkills.forEach((s) => doc.text(`• ${s}`));

  doc.moveDown();
  doc.fontSize(14).text("AI Resume Suggestions:");
  suggestions.forEach((s) => doc.text(`• ${s}`));

  doc.moveDown();
  doc.fontSize(10).text(`Generated on ${new Date().toLocaleString()}`);

  doc.end();
});

module.exports = router;
