#!/usr/bin/env bash
set -euo pipefail

echo "[INFO] Starting MCP server installation for zeazchain..."

# 1. System update
sudo apt update && sudo apt upgrade -y

# 2. Core dependencies
sudo apt install -y git curl build-essential jq

# 3. Node.js LTS (20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. pnpm package manager
npm install -g pnpm

# 5. Scaffold MCP server workspace
mkdir -p apps/mcp-server/src/{tools,rbac,logging,config} apps/mcp-server/logs
cd apps/mcp-server

# 6. Initialize project
pnpm init -y
pnpm add @modelcontextprotocol/sdk winston dotenv zod
pnpm add -D typescript tsx eslint vitest

# 7. Configure package.json
pnpm pkg set type="module"
pnpm pkg set scripts.dev="tsx watch src/index.ts"
pnpm pkg set scripts.build="tsc -p tsconfig.json"
pnpm pkg set scripts.start="node dist/index.js"

echo "[INFO] MCP server scaffold complete."
echo "[INFO] Run 'pnpm mcp:install' from root to build MCP server."
