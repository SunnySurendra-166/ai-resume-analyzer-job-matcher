const express = require("express");
const router = express.Router();

const SKILLS = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "aws",
  "git",
  "docker",
];

router.post("/match", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing inputs" });
  }

  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  const matchedSkills = [];
  const missingSkills = [];
  const skillStrength = {};

  SKILLS.forEach((skill) => {
    const count = resume.split(skill).length - 1;
    if (job.includes(skill)) {
      if (count > 0) {
        matchedSkills.push(skill);
        skillStrength[skill] = Math.min(100, count * 30);
      } else {
        missingSkills.push(skill);
      }
    }
  });

  const score = Math.round(
    (matchedSkills.length / (matchedSkills.length + missingSkills.length)) *
      100
  );

  const suggestions = missingSkills.map(
    (s) =>
      `You are missing ${s.toUpperCase()} — consider adding a project or experience demonstrating ${s}.`
  );

  res.json({
    score,
    matchedSkills,
    missingSkills,
    skillStrength,
    suggestions,
  });
});

module.exports = router;
