function generateSuggestions(missingSkills, score) {
  let suggestions = [];

  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider learning or adding projects related to: ${missingSkills.join(
        ", "
      )}.`
    );
  }

  if (score < 50) {
    suggestions.push(
      "Your match score is low. Try tailoring your resume more closely to the job description."
    );
  } else if (score < 75) {
    suggestions.push(
      "Good match, but you can improve by adding more relevant experience and skills."
    );
  } else {
    suggestions.push(
      "Great match! Your resume aligns well with the job requirements."
    );
  }

  suggestions.push(
    "Highlight real-world projects, tools, and technologies you have worked with."
  );

  return suggestions;
}

module.exports = { generateSuggestions };
