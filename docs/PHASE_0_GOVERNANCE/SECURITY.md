# Enterprise Security Bible (Zero Trust)

This document outlines the non-negotiable security principles of the ZeaZDev platform. All engineering and operations personnel must adhere to these mandates.

## 1. Core Principles

* **Zero Trust:** Never trust, always verify. All users, devices, and services (including pod-to-pod communication) must be explicitly authenticated and authorized. There is no "trusted" internal network.
* **Principle of Least Privilege (PoLP):** All IAM roles (Cloud), K8s Service Accounts, and database users must *only* have the absolute minimum permissions required for their specific function.
* **Defense in Depth:** Security is applied in compounding layers:
    1.  Edge (Cloudflare WAF)
    2.  Network (VPC, Private Subnets, Security Groups)
    3.  Orchestration (K8s Network Policies)
    4.  Application (ZKP-JWT Auth, DTO Validation)
    5.  Data (Encryption at Rest & In Transit)

## 2. Secrets Management (Vault Mandate)

* **Mandate:** All secrets are managed by **HashiCorp Vault**.
* **Forbidden:** Secrets (API keys, DB passwords, JWT secrets, private keys) are NEVER stored in `.env` files (outside local dev), Git, Docker images, or K8s `Secret` objects (in plain text).
* **Production Flow:**
    1.  The NestJS API (running in a K8s pod) is assigned a K8s Service Account.
    2.  This Service Account is authorized via the Vault K8s Auth Method.
    3.  At runtime, the pod authenticates to Vault, requests its required secrets (such as `POSTGRES_PASSWORD`), and injects them directly into its environment.
    4.  Secrets are short-lived (where possible) and auto-rotated by Vault.

## 3. Data Classification & Handling

* **Classification:** Data is classified (L1-L4) to determine handling requirements.
    * **L4 (Critical PII):** FinTech KYC data (Legal Name, Address, ID numbers), user-linked `nullifierHash`.
    * **L3 (Financial):** Wallet addresses, transaction history, balances.
    * **L2 (Internal):** User IDs, game session logs, IP addresses.
    * **L1 (Public):** Token prices, game descriptions.
* **Handling Mandate:**
    * All L4 data MUST be encrypted at rest (Postgres Transparent Data Encryption (TDE) or application-level field encryption).
    * All traffic (internal pod-to-pod and external) MUST be TLS 1.3. Service mesh (Istio/Linkerd) is used to enforce mTLS internally.
    * Access to L4 data in production is forbidden without an audited break-glass procedure.

## 4. Incident Response Plan (IRP)

* **Mandate:** A full Incident Response Plan must be documented, rehearsed (via gamedays), and automated.
* **Phases:**
    1.  **Detection:** (Prometheus/Alertmanager) Automated alerts for security anomalies (Auth failures, WAF blocks, anomalous API usage).
    2.  **Triage:** On-call engineer (PagerDuty) assesses severity (P0-P3).
    3.  **Containment:** Isolate affected systems. (Dynamic K8s Network Policies, IAM role revocation, enabling WAF rules).
    4.  **Eradication:** Identify and patch the vulnerability (requires Root Cause Analysis).
    5.  **Recovery:** Restore services from a known-good, audited state (GitOps/Terraform).
    6.  **Post-Mortem:** Conduct a blameless post-mortem. Document root cause and create new automated tests/alerts to prevent recurrence.

## 5. Network & Infrastructure Security

* **VPC:** All K8s nodes, RDS, and ElastiCache instances reside in **Private Subnets**. Only ALBs and NAT Gateways reside in Public Subnets.
* **Egress:** All outbound traffic from K8s pods MUST route through a **NAT Gateway** with a static IP. This IP is used for FinTech/Bank API whitelisting.
* **K8s Policies:** **Calico** is mandated. The default policy is `default-deny`. All pod-to-pod communication is blocked unless explicitly allowed (e.g., `api-service` can talk to `postgres` on 5432).