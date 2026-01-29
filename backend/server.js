import express from "express";
import cors from "cors";
import { generatePDF } from "./routes/report.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download-report", generatePDF);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
