#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ../.git/hooks

rm -f pre-push
ln -s ../../setup/git/hooks/pre-push pre-push

echo "Git set up successfully."
