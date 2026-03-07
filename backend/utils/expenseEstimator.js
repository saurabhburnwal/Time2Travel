/**
 * Expense Estimator Utility
 * Calculates approximate travel expenses based on:
 *  - Accommodation (hotel/host)
 *  - Transport (per km rate × total km)
 *  - Food (per person per day × days × group size multiplier)
 *  - Entry fees (sum of all place entry fees)
 */

// Per-person daily food cost (INR)
const FOOD_COST_PER_PERSON_PER_DAY = {
    budget: 250,
    standard: 500,
    premium: 900,
};

// Transport cost per km (INR) — auto/cab
const TRANSPORT_COST_PER_KM = {
    budget: 8,
    standard: 12,
    premium: 20,
};

// Group size multipliers
const GROUP_SIZE = {
    Solo: 1,
    Duo: 2,
    Family: 4,
    Friends: 5,
};

/**
 * Estimate expenses for a given roadmap variant
 * @param {object} params
 * @param {number} params.days           - Number of travel days
 * @param {number} params.accommodationPerNight - Price per night (hotel or host min amount)
 * @param {number} params.totalDistanceKm - Total route km (from routeOptimizer)
 * @param {Array}  params.places         - Selected places with entry_fee
 * @param {string} params.groupType      - 'Solo'|'Duo'|'Family'|'Friends'
 * @param {string} params.style          - 'budget'|'standard'|'premium'
 * @returns {object} Breakdown + total
 */
const estimateExpenses = ({ days, accommodationPerNight, totalDistanceKm, places, groupType, style = 'standard' }) => {
    const groupSize = GROUP_SIZE[groupType] || 1;

    const accommodation = parseFloat((accommodationPerNight * days).toFixed(2));

    const transportRate = TRANSPORT_COST_PER_KM[style] || TRANSPORT_COST_PER_KM.standard;
    const transport = parseFloat((totalDistanceKm * transportRate).toFixed(2));

    const foodDaily = (FOOD_COST_PER_PERSON_PER_DAY[style] || FOOD_COST_PER_PERSON_PER_DAY.standard) * groupSize;
    const food = parseFloat((foodDaily * days).toFixed(2));

    const entryFees = places.reduce((sum, p) => sum + parseFloat(p.entry_fee || 0), 0);
    const entryFeesTotal = parseFloat((entryFees * groupSize).toFixed(2));

    const total = parseFloat((accommodation + transport + food + entryFeesTotal).toFixed(2));

    return {
        accommodation,
        transport,
        food,
        entryFees: entryFeesTotal,
        total,
        breakdown: {
            accommodationNote: `₹${accommodationPerNight}/night × ${days} nights`,
            transportNote: `₹${transportRate}/km × ${totalDistanceKm} km`,
            foodNote: `₹${FOOD_COST_PER_PERSON_PER_DAY[style]}/person/day × ${groupSize} person(s) × ${days} days`,
            entryNote: `₹${entryFees} entry fees × ${groupSize} person(s)`,
        },
    };
};

module.exports = { estimateExpenses };
