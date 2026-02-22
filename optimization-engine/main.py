from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import networkx as nx
import numpy as np

app = FastAPI(title="Time2Travel Optimization Engine")

class Place(BaseModel):
    place_id: int
    name: str
    latitude: float
    longitude: float
    entry_fee: Optional[float] = 0
    avg_visit_time: Optional[int] = 60
    travel_type_id: Optional[int] = None

class Distance(BaseModel):
    place_a_id: int
    place_b_id: int
    distance: float

class OptimizationRequest(BaseModel):
    places: List[Place]
    distances: List[Distance]
    hotels: List[Dict]
    days: int
    budget: float
    travel_type_id: int
    group_type_id: Optional[int] = 1 # Default to Solo/General

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "optimization-engine"}

@app.post("/optimize")
async def optimize_roadmap(request: OptimizationRequest):
    """
    Builds a weighted graph using PLACE_DISTANCES and runs Dijkstra.
    Groups attractions into day-wise itineraries based on travel type, budget, and group type.
    """
    try:
        # 1. Build weighted graph
        G = nx.Graph()
        for dist in request.distances:
            G.add_edge(dist.place_a_id, dist.place_b_id, weight=dist.distance)
        
        # 2. Prioritize places by travel_type matching
        all_places = request.places
        if request.travel_type_id:
            all_places = sorted(
                all_places, 
                key=lambda x: (x.travel_type_id != request.travel_type_id, x.entry_fee)
            )

        unvisited = {p.place_id: p for p in all_places}
        itinerary = []
        total_distance = 0.0
        total_entry_fees = 0.0
        
        # 3. Pacing based on group_type_id
        # 1: Solo, 2: Couple, 3: Family, 4: Friends
        pacing_map = {
            1: {"places_per_day": 4, "time_multiplier": 1.0},
            2: {"places_per_day": 3, "time_multiplier": 1.2},
            3: {"places_per_day": 2, "time_multiplier": 1.5},
            4: {"places_per_day": 3, "time_multiplier": 1.1}
        }
        pacing = pacing_map.get(request.group_type_id, {"places_per_day": 3, "time_multiplier": 1.0})
        places_per_day = pacing["places_per_day"]
        
        hotel_price = request.hotels[0].get('price_per_night', 1000) if request.hotels else 1000
        est_accommodation = request.days * hotel_price
        est_food = 800 * request.days
        fixed_transport = 200 * request.days
        
        current_location_id = None
        
        for day in range(1, request.days + 1):
            if not unvisited:
                break
            
            day_places = []
            
            # Find start for the day
            if current_location_id is None or current_location_id not in G:
                current_place_id = next(iter(unvisited))
            else:
                min_dist = float('inf')
                current_place_id = next(iter(unvisited))
                for pid in unvisited:
                    try:
                        d = nx.shortest_path_length(G, source=current_location_id, target=pid, weight='weight')
                        penalty = 0.8 if unvisited[pid].travel_type_id == request.travel_type_id else 1.0
                        if (d * penalty) < min_dist:
                            min_dist = d
                            current_place_id = pid
                    except nx.NetworkXNoPath:
                        continue
            
            # Budget check
            place_to_add = unvisited[current_place_id]
            transport_multiplier = {1: 10, 2: 25, 3: 50}.get(request.travel_type_id, 25)
            
            current_total_est = total_entry_fees + est_accommodation + est_food + (total_distance * transport_multiplier) + fixed_transport
            if current_total_est > request.budget * 1.1 and place_to_add.entry_fee > 500:
                if place_to_add.travel_type_id != request.travel_type_id:
                    unvisited.pop(current_place_id) 
                    continue

            # Add first place
            day_places.append(unvisited.pop(current_place_id))
            total_entry_fees += day_places[-1].entry_fee
            
            # Fill the rest of the day
            for _ in range(places_per_day - 1):
                if not unvisited:
                    break
                
                last_place_id = day_places[-1].place_id
                nearest_place_id = None
                min_dist = float('inf')
                
                for pid in unvisited:
                    try:
                        if last_place_id in G and pid in G:
                            d = nx.shortest_path_length(G, source=last_place_id, target=pid, weight='weight')
                            penalty = 0.8 if unvisited[pid].travel_type_id == request.travel_type_id else 1.0
                            if (d * penalty) < min_dist:
                                min_dist = d
                                nearest_place_id = pid
                    except nx.NetworkXNoPath:
                        continue
                
                if nearest_place_id:
                    p_candidate = unvisited[nearest_place_id]
                    if (total_entry_fees + p_candidate.entry_fee + est_accommodation + est_food + ((total_distance + min_dist) * transport_multiplier) + fixed_transport) > request.budget * 1.2:
                        if p_candidate.travel_type_id != request.travel_type_id:
                            continue 
                    
                    total_distance += min_dist
                    day_places.append(unvisited.pop(nearest_place_id))
                    total_entry_fees += day_places[-1].entry_fee
                else:
                    next_id = next(iter(unvisited))
                    day_places.append(unvisited.pop(next_id))
                    total_entry_fees += day_places[-1].entry_fee

            itinerary.append({
                "day": day,
                "places": [p.dict() for p in day_places],
                "hotel": request.hotels[0] if request.hotels else None
            })
            
            if day_places:
                current_location_id = day_places[-1].place_id

        # 4. Final Expense Calculation
        est_transport = (total_distance * transport_multiplier) + fixed_transport
        total_cost = total_entry_fees + est_accommodation + est_transport + est_food
        
        budget_status = "within_budget" if total_cost <= request.budget else "over_budget"

        return {
            "roadmap": {
                "total_distance": round(total_distance, 2),
                "estimated_cost": round(total_cost, 2),
                "budget_status": budget_status,
                "days": itinerary
            },
            "expenses": {
                "entry_fees": round(total_entry_fees, 2),
                "accommodation": round(est_accommodation, 2),
                "transport": round(est_transport, 2),
                "food": round(est_food, 2)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
