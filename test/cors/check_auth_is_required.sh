#!/bin/bash

curl -X GET https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/api/request-quote -I

# without auth 
curl -L -X GET https://reimagined-enigma-r4pj75q447qv256vw-5000.app.github.dev/api/request-quote -I
