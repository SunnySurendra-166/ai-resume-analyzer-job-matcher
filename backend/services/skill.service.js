const SKILLS = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "aws",
  "docker",
  "kubernetes",
  "react",
  "angular",
  "vue",
  "python",
  "java",
  "c++",
  "html",
  "css",
  "git",
];

// Extract skills from text
const extractSkills = (text) => {
  const lowerText = text.toLowerCase();

  return SKILLS.filter((skill) => lowerText.includes(skill));
};

// Match resume vs job skills
const matchSkills = (resumeSkills, jobSkills) => {
  const matchedSkills = resumeSkills.filter((skill) =>
    jobSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );

  const score =
    jobSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / jobSkills.length) * 100);

  return { matchedSkills, missingSkills, score };
};

module.exports = { extractSkills, matchSkills };
