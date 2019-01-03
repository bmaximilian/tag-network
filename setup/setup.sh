#!/usr/bin/env bash

cd "$(dirname "$0")"

if [ "$1" == "prod" ]; then
    app_env=production
else
    app_env=development
fi

./docker.sh
./git.sh
