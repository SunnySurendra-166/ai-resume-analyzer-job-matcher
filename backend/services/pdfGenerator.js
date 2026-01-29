import PDFDocument from "pdfkit";

export function generatePDF(data) {
  return new Promise(resolve => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text("AI Resume Job Match Report", { underline: true });
    doc.moveDown();

    doc.fontSize(14).text(`Match Score: ${data.score}%`);
    doc.moveDown();

    doc.text("Matched Skills:");
    data.matchedSkills.forEach(s => doc.text(`- ${s}`));

    doc.moveDown();
    doc.text("Missing Skills:");
    data.missingSkills.forEach(s => doc.text(`- ${s}`));

    doc.moveDown();
    doc.text("AI Resume Suggestions:");
    data.suggestions.forEach(s => doc.text(`• ${s}`));

    doc.end();
  });
}
