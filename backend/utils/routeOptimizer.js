/**
 * Route Optimizer Utility
 * Uses Haversine formula for geographic distances and
 * Nearest Neighbor Algorithm (NNA) for route optimization.
 * Generates currently supported roadmap styles: fastest and budget.
 */

// ===== HAVERSINE DISTANCE =====
/**
 * Calculate distance in km between two lat/lng points
 */
const haversineDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const ROAD_MULTIPLIER = 1.25; // Accounting for real road curves vs direct air distance
    return R * c * ROAD_MULTIPLIER;
};

/**
 * Calculate the total distance of an ordered route in km
 */
const totalRouteDistance = (places) => {
    let dist = 0;
    for (let i = 0; i < places.length - 1; i++) {
        dist += haversineDistance(
            parseFloat(places[i].latitude),
            parseFloat(places[i].longitude),
            parseFloat(places[i + 1].latitude),
            parseFloat(places[i + 1].longitude)
        );
    }
    return parseFloat(dist.toFixed(2));
};

// ===== NEAREST NEIGHBOR ALGORITHM =====
/**
 * Greedily sort places into the shortest visiting order.
 * can prioritize a preferredType if provided.
 */
const nearestNeighborSort = (places, preferredType = null) => {
    if (places.length === 0) return [];
    const visited = new Set();
    const route = [];
    
    // Sort local copy to ensure predictable starting point
    // If preferredType exists, put one of those first
    const pool = [...places].sort((a, b) => {
        if (preferredType) {
            const aMatch = String(a.travel_type).toLowerCase() === preferredType.toLowerCase();
            const bMatch = String(b.travel_type).toLowerCase() === preferredType.toLowerCase();
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
        }
        return a.place_id - b.place_id;
    });

    let current = pool[0];

    visited.add(current.place_id);
    route.push(current);

    while (route.length < pool.length) {
        let nearest = null;
        let minDist = Infinity;

        for (const place of pool) {
            if (!visited.has(place.place_id)) {
                let dist = haversineDistance(
                    parseFloat(current.latitude),
                    parseFloat(current.longitude),
                    parseFloat(place.latitude),
                    parseFloat(place.longitude)
                );

                // Priority Logic: Discount virtual distance for preferred type
                // This makes the algorithm more likely to pick these places sooner
                if (preferredType && String(place.travel_type).toLowerCase() === preferredType.toLowerCase()) {
                    dist *= 0.6; // 40% distance discount for prioritization
                }

                if (dist < minDist) {
                    minDist = dist;
                    nearest = place;
                }
            }
        }

        if (nearest) {
            visited.add(nearest.place_id);
            route.push(nearest);
            current = nearest;
        } else {
            break;
        }
    }

    return route;
};

const groupIntoDays = (orderedPlaces) => {
    const MAX_MINUTES_PER_DAY = 480;
    const days = [];
    let currentDay = [];
    let dayMinutes = 0;

    for (const place of orderedPlaces) {
        const visitMins = place.avg_visit_time || 60;

        if (dayMinutes + visitMins > MAX_MINUTES_PER_DAY && currentDay.length > 0) {
            days.push(currentDay);
            currentDay = [];
            dayMinutes = 0;
        }

        currentDay.push(place);
        dayMinutes += visitMins;
    }

    if (currentDay.length > 0) {
        days.push(currentDay);
    }

    // Add visit order and estimated times
    return days.map((dayPlaces, dayIdx) => {
        let currentMinutes = 540; // 09:00 AM
        return {
            day: dayIdx + 1,
            places: dayPlaces.map((place, idx) => {
                const startHr = Math.floor(currentMinutes / 60);
                const startMin = currentMinutes % 60;
                const visitMins = place.avg_visit_time || 60;
                currentMinutes += visitMins + 30; // 30 min travel buffer
                const endHr = Math.floor(currentMinutes / 60);
                const endMin = currentMinutes % 60;

                return {
                    ...place,
                    visitOrder: idx + 1,
                    estimatedStart: `${String(startHr).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`,
                    estimatedEnd: `${String(endHr - Math.floor(30 / 60)).padStart(2, '0')}:${String((endMin + 60 - 30) % 60).padStart(2, '0')}`,
                };
            }),
        };
    });
};

// ===== ROADMAP STYLES =====

/**
 * FASTEST: Pure NNA — shortest total path, limited to realistic spots per trip
 */
const generateFastest = (places, days = 3, preferredType = null) => {
    const maxSpots = Math.min(places.length, days * 4); // max 4 spots/day
    const ordered = nearestNeighborSort(places, preferredType).slice(0, maxSpots);
    return {
        style: 'fastest',
        label: 'Fastest Route',
        description: `Optimised path covering ${preferredType ? 'your favorite nodes first' : 'top attractions'} with minimum travel time.`,
        icon: '⚡',
        orderedPlaces: ordered,
        days: groupIntoDays(ordered),
        totalDistanceKm: totalRouteDistance(ordered),
    };
};

/**
 * BUDGET: Exclude places above ₹50 entry fee first (free places), then add paid ones
 * Limited to realistic spots based on trip days
 */
const generateBudget = (places, days = 3, preferredType = null) => {
    const maxSpots = Math.min(places.length, days * 3); // budget = 3 spots/day (more relaxed)
    const free = places.filter(p => parseFloat(p.entry_fee || 0) <= 50);
    const paid = places.filter(p => parseFloat(p.entry_fee || 0) > 50)
        .sort((a, b) => parseFloat(a.entry_fee || 0) - parseFloat(b.entry_fee || 0));

    // Prefer free & cheap places, append paid ones after, applying priority to both sets
    const combined = [...nearestNeighborSort(free, preferredType), ...nearestNeighborSort(paid, preferredType)];
    const ordered = combined.slice(0, maxSpots);

    return {
        style: 'budget',
        label: 'Budget Friendly',
        description: 'Maximises free & low-cost attractions. Paid spots added at end if time permits.',
        icon: '💰',
        orderedPlaces: ordered,
        days: groupIntoDays(ordered),
        totalDistanceKm: totalRouteDistance(ordered),
    };
};

// ===== MAIN EXPORT =====
/**
 * Generate roadmap options for a set of places.
 * @param {Array} places - Place records from DB
 * @param {number} days  - Number of trip days
 * @param {string} preferredType - Category to prioritize
 * @returns {Object} - currently includes { fastest, budget }
 */
const generateAllRoadmaps = (places, days = 3, preferredType = null) => {
    if (!places || places.length === 0) {
        return { fastest: null, budget: null };
    }

    return {
        fastest: generateFastest(places, days, preferredType),
        budget: generateBudget(places, days, preferredType),
    };
};

module.exports = { haversineDistance, totalRouteDistance, generateAllRoadmaps };
