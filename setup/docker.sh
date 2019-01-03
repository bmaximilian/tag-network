#!/usr/bin/env bash

cd "$(dirname "$0")"

cd ..

if [ "$1" == "prod" ]; then
    cp -f docker-compose.prod.yml docker-compose.override.yml
else
    cp -f docker-compose.dev.yml docker-compose.override.yml
fi

echo "Docker files created successfully."
