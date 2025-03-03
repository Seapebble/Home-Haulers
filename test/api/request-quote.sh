#!/bin/bash

curl -X POST "https://reimagined-enigma-r4pj75q447qv256vw-5173.app.github.dev/api/request-quote" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Test User",
           "email": "test@example.com",
           "phone": "123-456-7890",
           "movingDate": "2025-04-01",
           "movingSize": "2-Bedroom Apartment",
           "movingFrom": "Los Angeles, CA",
           "movingTo": "San Francisco, CA",
           "additionalDetails": "Need packing service"
         }'

echo -e "\n✅ Test Completed"
