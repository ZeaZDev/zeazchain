#!/bin/bash
#
# ZeaZChain (zeazchain) Developer Environment Setup
# Author: ZeaZDev Meta-Intelligence
# Generated: Friday, November 14, 2025 at 2:34 PM +07
#
# This script checks for and installs required dependencies for the
# zeazchain project on an Ubuntu/Debian-based system.
# Run with: ./setup_dev_env.sh

set -e

echo "--- ZeaZChain Developer Environment Setup ---"

# --- Helper ---
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# --- 1. Check Git ---
if ! command_exists git; then
  echo "Git not found. Installing..."
  sudo apt-get update
  sudo apt-get install -y git
else
  echo "✅ Git is already installed."
fi

# --- 2. Check Node.js & npm (Req: v20) ---
if ! command_exists node || ! node -v | grep -q "v20\."; then
  echo "Node.js v20 not found. Installing..."
  # Add NodeSource repository for Node.js 20.x
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "✅ Node.js v20 is already installed."
fi
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# --- 3. Check pnpm ---
if ! command_exists pnpm; then
  echo "pnpm not found. Installing globally via npm..."
  npm install -g pnpm
else
  echo "✅ pnpm is already installed."
fi
echo "pnpm version: $(pnpm -v)"

# --- 4. Check Docker & Docker Compose ---
if ! command_exists docker; then
  echo "Docker not found. Installing..."
  # Add Docker's official GPG key:
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc

  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update

  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  
  echo "Adding current user to 'docker' group to run without sudo..."
  sudo usermod -aG docker $USER
  echo "IMPORTANT: You must log out and log back in for Docker group changes to take effect."
else
  echo "✅ Docker is already installed."
fi

if ! command_exists docker-compose; then
    if ! docker compose version >/dev/null 2>&1; then
        echo "Docker Compose (v2 plugin) not found. This is unexpected as it should be installed with Docker."
        echo "Please check your Docker installation."
        exit 1
    else
        echo "✅ Docker Compose (v2 plugin) is already installed."
    fi
else
    echo "✅ Docker Compose (v1) is already installed."
fi

# --- 5. Project Setup ---
echo "---"
echo "Project setup: Installing dependencies..."

if [ -f "package.json" ] && [ -f "pnpm-workspace.yaml" ]; then
  echo "Project found. Installing dependencies with pnpm..."
  pnpm install

  echo "Creating .env file from example..."
  if [ -f ".env" ]; then
    echo ".env file already exists. Skipping creation."
  else
    cp .env.example .env
  fi
else
  echo "WARNING: Run this script from the root of the 'zeazchain' project."
fi

echo "---"
echo "--- ✅ Environment Setup Complete ---"
echo "---"
echo "Next Steps:"
echo "1. (CRITICAL) If Docker was just installed, you MUST log out and log back in."
echo "2. Open the '.env' file and fill in your secrets (e.g., INFURA_API_KEY, PRIVATE_KEY)."
echo "3. Start the local database and cache:"
echo "   docker-compose -f infra/docker-compose.yml up -d"
echo "4. Run the project in development mode:"
echo "   pnpm dev"
echo "5. Open the project in VS Code and install the recommended extensions (if prompted)."
echo "---"
