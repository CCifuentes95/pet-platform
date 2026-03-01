# ADR-001: Render + Vercel over Kubernetes (K3s)

**Status:** Accepted
**Date:** 2026-02-24

## Context

The original architecture proposed K3s on AWS EC2 Spot Instances with Terraform. The project is a solo-developer portfolio piece with zero current users, very limited development time, and a budget constraint of under $10/month.

## Decision

Use managed PaaS (Render for backend, Vercel for frontend, Neon for database) instead of self-hosted Kubernetes.

## Consequences

- Zero infrastructure maintenance burden
- $0–9/month vs $20–50+/month for EC2
- Deploy in minutes, not days
- No Kubernetes or Terraform in the repo (less portfolio signal for infra-specific roles)
- The Dockerfile remains production-ready and portable to any orchestrator if needed later

## Alternatives Considered

- **K3s on EC2 Spot** — too expensive and too much maintenance overhead for a solo developer
- **ECS Fargate** — managed containers but cost becomes unpredictable without traffic
- **Railway** — viable alternative to Render; chose Render for Docker-native deploys and familiarity
