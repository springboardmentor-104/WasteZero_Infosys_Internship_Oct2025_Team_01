module.exports = function matchOpportunity(volunteer, opportunities) {
  return opportunities.map(opp => {
    let score = 0;

    // Skill matching (40 points)
    const matchedSkills = opp.required_skills.filter(s => volunteer.skills.includes(s));
    score += matchedSkills.length * 10;

    // Location matching (30 points)
    if (volunteer.location === opp.location) score += 30;

    // Status boost (only 'open')
    if (opp.status === 'open') score += 10;

    // Past accepted applications boost (experience)
    if (volunteer.experience_score) score += volunteer.experience_score;

    return { ...opp._doc, match_score: score };
  }).sort((a, b) => b.match_score - a.match_score);
};
