import PDFDocument from "pdfkit";

export const generatePDF = (req, res) => {
  const { matchPercentage, summary, similarityScore, method } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=match-report.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("AI Resume Job Match Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Match Percentage: ${matchPercentage}%`);
  doc.text(`Similarity Score: ${similarityScore}`);
  doc.text(`Method Used: ${method}`);
  doc.moveDown();

  doc.fontSize(12).text("Summary:");
  doc.text(summary);

  doc.end();
};
