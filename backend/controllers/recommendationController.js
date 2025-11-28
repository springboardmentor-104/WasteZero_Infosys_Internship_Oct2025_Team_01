const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

/**
 * Basic matching:
 * - Skill overlap score
 * - Geo distance filtering (using $geoNear would be more advanced)
 */
exports.getMatches = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const volunteer = await User.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    // naive approach: compute skill overlap and distance (approx)
    const opportunities = await Opportunity.find({ status: 'open' }).populate('ngo','name location');

    const matches = opportunities.map(op => {
      const skillMatchCount = (op.required_skills || []).filter(skill => (volunteer.skills || []).includes(skill)).length;
      const skillScore = (op.required_skills && op.required_skills.length) ? skillMatchCount / op.required_skills.length : 0;
      // compute distance if coordinates exist (Haversine)
      let distanceKm = null;
      try {
        const vcoords = volunteer.location?.coordinates;
        const ocoords = op.location?.coordinates;
        if (vcoords && ocoords && vcoords.length ===2 && ocoords.length===2) {
          // simple haversine
          const toRad = (x) => x * Math.PI / 180;
          const [vlng, vlat] = vcoords;
          const [olng, olat] = ocoords;
          const R = 6371;
          const dLat = toRad(olat - vlat);
          const dLon = toRad(olng - vlng);
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(toRad(vlat)) * Math.cos(toRad(olat)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          distanceKm = R * c;
        }
      } catch (e) { distanceKm = null; }
      // base score: skillScore weighted, prefer nearer
      const distanceScore = distanceKm === null ? 0 : Math.max(0, 1 - (distanceKm / 100)); // simplistic
      const finalScore = (skillScore * 0.7) + (distanceScore * 0.3);
      return { opportunity: op, score: finalScore, distanceKm, skillMatchCount };
    });

    matches.sort((a,b) => b.score - a.score);

    res.json(matches.slice(0, 50)); // paginated top results
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
