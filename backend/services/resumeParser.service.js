const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

async function parseResume(filePath) {
  const ext = path.extname(filePath);

  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (ext === ".docx") {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  }

  throw new Error("Unsupported file format");
}

module.exports = { parseResume };
