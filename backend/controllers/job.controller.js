const { extractSkills } = require("../services/skillExtractor.service");
const { generateSuggestions } = require("../services/aiSuggestion.service");

exports.matchJob = (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: "Missing input data" });
  }

  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);

  const matchedSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );

  const score = Math.round(
    (matchedSkills.length / jobSkills.length) * 100
  );

  const suggestions = generateSuggestions(missingSkills, score);

  res.json({
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    score,
    suggestions,
  });
};
