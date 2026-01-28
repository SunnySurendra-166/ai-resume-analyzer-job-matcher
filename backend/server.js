const express = require("express");
const cors = require("cors");

const reportRoutes = require("./routes/report.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
