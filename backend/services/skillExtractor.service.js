const ALL_SKILLS = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "mysql",
  "docker",
  "aws",
  "git",
  "react",
  "java",
];

function normalize(text) {
  return text.toLowerCase();
}

function countOccurrences(text, skill) {
  const regex = new RegExp(`\\b${skill}\\b`, "g");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

exports.matchSkills = (resumeText, jobText) => {
  const resume = normalize(resumeText);
  const job = normalize(jobText);

  const resumeSkills = [];
  const jobSkills = [];
  const matchedSkills = [];
  const missingSkills = [];
  const skillStrength = {};

  ALL_SKILLS.forEach((skill) => {
    const resumeCount = countOccurrences(resume, skill);
    const jobCount = countOccurrences(job, skill);

    if (resumeCount > 0) resumeSkills.push(skill);
    if (jobCount > 0) jobSkills.push(skill);

    if (resumeCount > 0 && jobCount > 0) {
      matchedSkills.push(skill);
      skillStrength[skill] = Math.min(90, 50 + resumeCount * 10);
    } else if (jobCount > 0 && resumeCount === 0) {
      missingSkills.push(skill);
      skillStrength[skill] = 20;
    }
  });

  const score =
    jobSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    skillStrength,
    score,
  };
};
