/**
 * Route Optimizer Utility
 * Uses Haversine formula for geographic distances and
 * Nearest Neighbor Algorithm (NNA) for route optimization.
 * Generates 4 roadmap styles: fastest, scenic, budget, balanced.
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
    return R * c;
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
 * Greedily sort places into the shortest visiting order
 * starting from the first (lowest ID) place.
 */
const nearestNeighborSort = (places) => {
    if (places.length === 0) return [];
    const visited = new Set();
    const route = [];
    let current = places[0];

    visited.add(current.place_id);
    route.push(current);

    while (route.length < places.length) {
        let nearest = null;
        let minDist = Infinity;

        for (const place of places) {
            if (!visited.has(place.place_id)) {
                const dist = haversineDistance(
                    parseFloat(current.latitude),
                    parseFloat(current.longitude),
                    parseFloat(place.latitude),
                    parseFloat(place.longitude)
                );
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
        }
    }

    return route;
};

// ===== DAY GROUPING =====
/**
 * Split an ordered route into days.
 * Max visit time per day is 480 minutes (8 hours).
 * Adds estimated start/end times (visit starts 09:00).
 */
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
 * FASTEST: Pure NNA — shortest total path
 */
const generateFastest = (places) => {
    const ordered = nearestNeighborSort(places);
    return {
        style: 'fastest',
        label: 'Fastest Route',
        description: 'Optimised shortest path covering all attractions with minimum travel time.',
        icon: '⚡',
        orderedPlaces: ordered,
        days: groupIntoDays(ordered),
        totalDistanceKm: totalRouteDistance(ordered),
    };
};

/**
 * BUDGET: Exclude places above ₹50 entry fee first (free places), then add paid ones
 */
const generateBudget = (places, budgetPerDay = 500) => {
    const free = places.filter(p => parseFloat(p.entry_fee || 0) <= 50);
    const paid = places.filter(p => parseFloat(p.entry_fee || 0) > 50);

    // Prefer free & cheap places, append paid ones after
    const combined = [...nearestNeighborSort(free), ...nearestNeighborSort(paid)];
    const ordered = combined;

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
 * @returns {Object} - { fastest, budget }
 */
const generateAllRoadmaps = (places) => {
    if (!places || places.length === 0) {
        return { fastest: null, budget: null };
    }

    return {
        fastest: generateFastest(places),
        budget: generateBudget(places),
    };
};

module.exports = { haversineDistance, totalRouteDistance, generateAllRoadmaps };
