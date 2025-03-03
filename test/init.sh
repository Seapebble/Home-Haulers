#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

commands=(
    "api/get-quotes.sh"
    "api/preflight-request.sh"
    "api/request-quote-light.sh"
    "api/request-quote.sh"
    "cors/Issue-Access-Control-Allow-Origin.sh"
    "cors/headers.sh"
    "api/check-API-Requires.sh"
    "cors/test_wout_auth.sh"
    "cors/check_auth_is_required.sh"
)

# Check if each file exists before running chmod
for command in "${commands[@]}"; do
  FILE_PATH="$SCRIPT_DIR/$command"

  if [[ -e "$FILE_PATH" && ! -d "$FILE_PATH" ]] || [[ -L "$FILE_PATH" ]]; then
    sudo chmod +x "$FILE_PATH"
    echo "Made $FILE_PATH executable."
  else
    echo "Warning: $FILE_PATH not found!"
  fi
done
