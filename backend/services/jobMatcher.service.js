// backend/services/jobMatcher.service.js

const { extractSkills } = require("./skillExtractor.service");

const matchJobWithResume = (resumeText, jobDescription) => {
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);

  const matchedSkills = resumeSkills.filter(skill =>
    jobSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(skill =>
    !resumeSkills.includes(skill)
  );

  const score =
    jobSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    score
  };
};

module.exports = { matchJobWithResume };
