const SKILLS = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "aws",
  "docker",
  "react",
  "python",
  "java",
];

const extractSkills = (text) => {
  if (!text) return [];

  const lowerText = text.toLowerCase();
  return SKILLS.filter((skill) => lowerText.includes(skill));
};

module.exports = {
  extractSkills,
};
