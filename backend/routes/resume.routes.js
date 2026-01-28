const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    res.json({ extractedText: pdfData.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read resume PDF" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "Resume route is live" });
});

module.exports = router;
