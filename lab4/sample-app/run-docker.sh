#!/usr/bin/env bash
set -e

name=$(npm pkg get name | tr -d '"')
version=$(npm pkg get version | tr -d '"')

echo "Starting $name:$version container..."
docker run --rm -p 8080:8080 "$name:$version"
