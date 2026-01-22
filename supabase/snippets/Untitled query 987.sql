SELECT name, entry_fee 
FROM places 
WHERE ST_DWithin(location, ST_MakePoint(longitude, latitude)::geography, 5000);