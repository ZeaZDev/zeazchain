#!/bin/bash
#
# ZeaZDev Project Update Script
# Author: ZeaZDev Meta-Intelligence
# Generated: Saturday, November 15, 2025 at 1:02 AM +07
#
# This script pulls the latest changes for the 'zeazchain' repo
# and installs any new dependencies.

set -e

# --- Configuration ---
REPO_URL="https://github.com/ZeaZDev/zeazchain.git"
REPO_DIR="zeazchain"
DEFAULT_BRANCH="main"

echo "--- Starting ZeaZChain Project Update ---"

# 1. Clone or Pull the Repository
if [ -d "$REPO_DIR" ]; then
  echo "✅ Repository '$REPO_DIR' found. Pulling latest changes..."
  cd $REPO_DIR
  
  # Stash any local changes to avoid conflicts
  echo "Stashing local changes..."
  git stash push -m "Auto-stash before pull"
  
  echo "Checking out '$DEFAULT_BRANCH' and pulling..."
  git checkout $DEFAULT_BRANCH
  git pull origin $DEFAULT_BRANCH
  
  echo "Latest changes pulled."
  
  # Try to pop the stash
  echo "Applying stashed changes..."
  if ! git stash pop; then
    echo "Could not auto-pop stash. Please resolve conflicts manually with 'git stash pop'."
  fi
  
else
  echo "Repository '$REPO_DIR' not found. Cloning..."
  git clone $REPO_URL
  cd $REPO_DIR
fi

# 2. Install/Update Dependencies
echo "Updating dependencies with pnpm..."
if command -v pnpm >/dev/null 2>&1; then
  pnpm install
else
  echo "WARNING: pnpm not found. Please install it with 'npm install -g pnpm' and run 'pnpm install' manually."
  # Attempt with npm as a fallback
  npm install
fi

echo "---"
echo "--- ✅ Project is up to date! ---"
echo "---"
echo "You can now start the local environment:"
echo "1. docker-compose -f infra/docker-compose.yml up -d"
echo "2. pnpm dev"
echo "---"
