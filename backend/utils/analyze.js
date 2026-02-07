export function analyzeResume(resume, job) {
  const resumeWords = resume.toLowerCase().split(/\W+/);
  const jobWords = job.toLowerCase().split(/\W+/);

  const resumeSet = new Set(resumeWords);
  const jobSet = new Set(jobWords);

  let matched = 0;
  jobSet.forEach(word => {
    if (resumeSet.has(word)) matched++;
  });

  const score = Math.min(
    Math.round((matched / jobSet.size) * 100),
    100
  );

  const missingSkills = [...jobSet].filter(w => !resumeSet.has(w)).slice(0, 5);

  return {
    matchPercentage: score,
    missingSkills,
    summary: `Resume matches the job description with ${score}% relevance.`
  };
}
