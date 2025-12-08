import Opportunity from '../models/Opportunity.js';
import User from '../models/User.js';

/**
 * Calculate skill match score
 */
const calculateSkillMatch = (volunteerSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 1.0;
  if (!volunteerSkills || volunteerSkills.length === 0) return 0.0;

  const matchingSkills = volunteerSkills.filter(skill =>
    requiredSkills.some(reqSkill =>
      reqSkill.toLowerCase() === skill.toLowerCase()
    )
  );

  return matchingSkills.length / requiredSkills.length;
};

/**
 * Calculate location proximity score (simple string matching)
 * In production, use geolocation APIs for accurate distance calculation
 */
const calculateLocationMatch = (volunteerLocation, opportunityLocation) => {
  if (!volunteerLocation || !opportunityLocation) return 0.5;

  const volunteerLoc = volunteerLocation.toLowerCase().trim();
  const opportunityLoc = opportunityLocation.toLowerCase().trim();

  // Exact match
  if (volunteerLoc === opportunityLoc) return 1.0;

  // Partial match (contains)
  if (volunteerLoc.includes(opportunityLoc) || opportunityLoc.includes(volunteerLoc)) {
    return 0.7;
  }

  // Check for city/state matches
  const volunteerParts = volunteerLoc.split(/[,\s]+/);
  const opportunityParts = opportunityLoc.split(/[,\s]+/);

  const commonParts = volunteerParts.filter(part =>
    opportunityParts.some(oppPart => oppPart === part && part.length > 2)
  );

  if (commonParts.length > 0) return 0.5;

  return 0.2;
};

/**
 * Calculate waste type match score
 */
const calculateWasteTypeMatch = (volunteerSkills, wasteType) => {
  if (!wasteType) return 0.5;

  const wasteTypeLower = wasteType.toLowerCase();
  const relevantSkills = [
    'recycling', 'composting', 'waste management',
    'environmental', 'sustainability', 'green'
  ];

  const hasRelevantSkill = volunteerSkills?.some(skill =>
    relevantSkills.some(relevant =>
      skill.toLowerCase().includes(relevant) ||
      wasteTypeLower.includes(skill.toLowerCase())
    )
  );

  return hasRelevantSkill ? 1.0 : 0.3;
};

/**
 * Match volunteers to opportunities
 * @param {string} volunteerId - Volunteer user ID
 * @param {number} limit - Maximum number of matches to return
 * @returns {Array} Sorted array of opportunities with match scores
 */
export const matchVolunteerToOpportunities = async (volunteerId, limit = 10) => {
  try {
    const volunteer = await User.findById(volunteerId);
    if (!volunteer || volunteer.role !== 'volunteer') {
      throw new Error('Invalid volunteer');
    }

    // Get all open opportunities
    const opportunities = await Opportunity.find({ status: 'open' })
      .populate('ngo_id', 'name email location');

    const matches = opportunities.map(opportunity => {
      // Calculate individual scores
      const skillScore = calculateSkillMatch(volunteer.skills, opportunity.required_skills);
      const locationScore = calculateLocationMatch(volunteer.location, opportunity.location);
      const wasteTypeScore = calculateWasteTypeMatch(volunteer.skills, opportunity.waste_type);

      // Weighted total score
      // Skills: 40%, Location: 30%, Waste Type: 30%
      const totalScore = (
        skillScore * 0.4 +
        locationScore * 0.3 +
        wasteTypeScore * 0.3
      );

      return {
        opportunity: opportunity.toObject(),
        matchScore: Math.round(totalScore * 100) / 100,
        breakdown: {
          skillMatch: Math.round(skillScore * 100) / 100,
          locationMatch: Math.round(locationScore * 100) / 100,
          wasteTypeMatch: Math.round(wasteTypeScore * 100) / 100
        }
      };
    });

    // Sort by match score (highest first) and limit results
    const sortedMatches = matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);

    return sortedMatches;
  } catch (error) {
    throw new Error(`Matching error: ${error.message}`);
  }
};

/**
 * Match opportunities to a volunteer (reverse matching)
 * @param {string} opportunityId - Opportunity ID
 * @param {number} limit - Maximum number of volunteers to return
 * @returns {Array} Sorted array of volunteers with match scores
 */
export const matchOpportunityToVolunteers = async (opportunityId, limit = 10) => {
  try {
    const opportunity = await Opportunity.findById(opportunityId)
      .populate('ngo_id', 'name email location');

    if (!opportunity) {
      throw new Error('Opportunity not found');
    }

    // Get all volunteers
    const volunteers = await User.find({ role: 'volunteer' });

    const matches = volunteers.map(volunteer => {
      const skillScore = calculateSkillMatch(volunteer.skills, opportunity.required_skills);
      const locationScore = calculateLocationMatch(volunteer.location, opportunity.location);
      const wasteTypeScore = calculateWasteTypeMatch(volunteer.skills, opportunity.waste_type);

      const totalScore = (
        skillScore * 0.4 +
        locationScore * 0.3 +
        wasteTypeScore * 0.3
      );

      return {
        volunteer: {
          id: volunteer._id,
          name: volunteer.name,
          email: volunteer.email,
          skills: volunteer.skills,
          location: volunteer.location,
          bio: volunteer.bio
        },
        matchScore: Math.round(totalScore * 100) / 100,
        breakdown: {
          skillMatch: Math.round(skillScore * 100) / 100,
          locationMatch: Math.round(locationScore * 100) / 100,
          wasteTypeMatch: Math.round(wasteTypeScore * 100) / 100
        }
      };
    });

    // Sort by match score (highest first) and limit results
    const sortedMatches = matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);

    return sortedMatches;
  } catch (error) {
    throw new Error(`Matching error: ${error.message}`);
  }
};

