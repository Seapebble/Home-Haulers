#!/bin/bash

echo "🚀 Testing API: Fetch All Quotes"

curl -X GET "https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/api/quotes" \
     -H "Content-Type: application/json"
     
echo -e "\n✅ Test Completed"
