const Opportunity = require('../models/Opportunity');
const User = require('../models/User');
const matchOpportunity = require('../utils/matching');

const getRecommendedOpportunities = async (req, res) => {
  try {
    const volunteerId = req.userId;

    const volunteer = await User.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    const opportunities = await Opportunity.find({ status: "open" });

    const ranked = matchOpportunity(volunteer, opportunities);

    res.json({
      message: "Recommended Opportunities",
      recommendations: ranked
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating recommendations" });
  }
};

module.exports = { getRecommendedOpportunities };
