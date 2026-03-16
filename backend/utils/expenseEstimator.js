/**
 * Expense Estimator Utility
 * Calculates approximate travel expenses based on:
 *  - Accommodation (hotel/host)
 *  - Transport (per km rate × total km)
 *  - Food (per person per day × days × group size multiplier)
 *  - Entry fees (sum of all place entry fees)
 */

// Per-person daily food cost (INR) - Refined for accuracy
const FOOD_COST_PER_PERSON_PER_DAY = {
    budget: { breakfast: 50, lunch: 100, dinner: 150 },    // total 300
    standard: { breakfast: 100, lunch: 200, dinner: 300 }, // total 600
    premium: { breakfast: 200, lunch: 400, dinner: 400 },  // total 1000
};

// Accurate Transport rates (INR per km) - Based on South Indian Taxi/Auto market
const TRANSPORT_COST_PER_KM = {
    budget: 15,    // Auto-rickshaw / Shared transport
    standard: 22,  // Sedan / Prime Cab
    premium: 32,   // SUV / Luxury
};

// Driver Daily Allowance (Standard in India for outstation/multi-day trips)
const DRIVER_ALLOWANCE_PER_DAY = {
    budget: 0,
    standard: 300,
    premium: 500,
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
    const allowanceRate = DRIVER_ALLOWANCE_PER_DAY[style] || 0;
    
    // Base transport + Daily Driver Allowance
    let transport = (totalDistanceKm * transportRate) + (days * allowanceRate);
    
    // Add 8% buffer for Tolls, Parking, and Local Detours (Standard in trip planning)
    transport = transport * 1.08;
    
    const transportTotal = parseFloat(transport.toFixed(2));

    const foodConfig = FOOD_COST_PER_PERSON_PER_DAY[style] || FOOD_COST_PER_PERSON_PER_DAY.standard;
    const foodPerPersonDay = foodConfig.breakfast + foodConfig.lunch + foodConfig.dinner;
    const foodDaily = foodPerPersonDay * groupSize;
    const food = parseFloat((foodDaily * days).toFixed(2));

    const entryFees = places.reduce((sum, p) => sum + parseFloat(p.entry_fee || 0), 0);
    const entryFeesTotal = parseFloat((entryFees * groupSize).toFixed(2));

    const total = parseFloat((accommodation + transportTotal + food + entryFeesTotal).toFixed(2));

    return {
        accommodation,
        transport: transportTotal,
        food,
        entryFees: entryFeesTotal,
        total,
        breakdown: {
            accommodationNote: `₹${accommodationPerNight}/night × ${days} nights`,
            transportNote: `₹${transportRate}/km × ${totalDistanceKm.toFixed(1)} km + ₹${allowanceRate}/day allowance + 8% tolls/parking`,
            foodNote: `₹${foodPerPersonDay}/person/day × ${groupSize} person(s) × ${days} days`,
            entryNote: `₹${entryFees} entry fees × ${groupSize} person(s)`,
        },
    };
};

module.exports = { estimateExpenses };
