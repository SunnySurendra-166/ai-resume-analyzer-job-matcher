const SKILLS = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "aws",
  "docker",
  "git"
];

export function analyzeSkills(resume, job) {
  const resumeText = resume.toLowerCase();
  const jobText = job.toLowerCase();

  let matched = [];
  let missing = [];
  let strengths = {};

  SKILLS.forEach(skill => {
    if (jobText.includes(skill)) {
      if (resumeText.includes(skill)) {
        matched.push(skill);
        strengths[skill] = 60;
      } else {
        missing.push(skill);
      }
    }
  });

  const score = Math.round((matched.length / (matched.length + missing.length)) * 100) || 0;

  const suggestions = missing.map(
    s => `You are missing ${s.toUpperCase()} — consider adding a project or experience demonstrating ${s}.`
  );

  return {
    score,
    matchedSkills: matched,
    missingSkills: missing,
    skillStrength: strengths,
    suggestions
  };
}
