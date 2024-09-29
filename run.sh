#!/bin/bash


IMG_NAME="td-bot:latest"

ENV_FILE=".env"

# Initialize an array
env_vars=()

# Read the .env file line by line
while IFS= read -r line || [[ -n "$line" ]]; do
    # Ignore empty lines and lines starting with #
    if [[ -n "$line" && ! "$line" =~ ^# ]]; then
        # Extract the key and value
        key=$(echo "$line" | cut -d '=' -f 1)
        value=$(echo "$line" | cut -d '=' -f 2-)
        # Add each line to the env_vars array with the value in double quotes
        env_vars+=("-e$key=$value")
    fi
done < "$ENV_FILE"

version=$(cat version)


docker container rm tomorrows-day-discord

docker run \
-d \
--name tomorrows-day-discord \
"${env_vars[@]}" \
$IMG_NAME