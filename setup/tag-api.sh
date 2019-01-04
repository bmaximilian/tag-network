#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ../tag-api

cp -f .env.example .env
adonis key:generate

echo "Tag Api set up successfully."
