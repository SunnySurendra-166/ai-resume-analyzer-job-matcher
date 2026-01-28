const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    }

    if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        path: req.file.path,
      });
      text = result.value;
    }

    res.json({
      message: "Resume uploaded successfully",
      resumeText: text,
    });
  } catch (error) {
    res.status(500).json({ message: "Resume parsing failed" });
  }
};
