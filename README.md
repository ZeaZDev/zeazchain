# ZeaZChain (ZEAZ)
# OMEGA-TIER PRODUCTION PROJECT (ZEAZDEV)

**ZeaZChain** is an **OMEGA-TIER production-grade** Multi-Platform FiGaTect Super-App that seamlessly integrates:

* **DeFi** (Decentralized Finance): Wallet, Swap, Stake, Trade
* **GameFi** (Game Finance): Unity-powered games with crypto rewards
* **FinTech** (Financial Technology): Real card issuance & Thai bank integration

Built as a **MiniApp for World App**, ZeaZChain uses **World ID Zero-Knowledge Proof (ZKP)** as the foundational identity verification layer for all high-value functions.

## 🏗️ Architecture

This is a `pnpm` monorepo containing the entire ZeaZChain ecosystem.

* `/apps/miniapp`: The React Native (Expo) MiniApp frontend.
* `/apps/api`: The NestJS API server backend.
* `/packages/contracts`: Solidity smart contracts (Hardhat).
* `/packages/game-unity`: Unity WebGL game client.
* `/packages/ui`: Shared React components.
* `/infra`: Docker, Kubernetes, and deployment scripts.

## 🚀 Getting Started

1.  **Install `pnpm`:**
    ```bash
    npm install -g pnpm
    ```
2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
3.  **Setup Environment:**
    * Copy `.env.example` to `.env` in the root.
    * Fill in credentials for Postgres, Redis, World ID, etc.
4.  **Run Local Environment:**
    ```bash
    docker-compose -f infra/docker-compose.yml up -d
    ```
5.  **Run Development Servers:**
    ```bash
    pnpm dev
    ```

## 📄 License
Proprietary - All Rights Reserved
Copyright (c) 2025 ZeaZDev
