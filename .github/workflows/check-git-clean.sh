#!/bin/bash

# Check the git status
git_status=$(git status --porcelain)

# If the git status is not empty, the repo is not clean
if [ -n "$git_status" ]; then
    echo "Repo is not clean. Here's the diff:"
    git diff
    exit 1
else
    echo "Repo is clean."
fi
