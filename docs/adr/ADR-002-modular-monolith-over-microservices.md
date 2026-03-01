# ADR-002: Modular Monolith over Microservices

**Status:** Accepted
**Date:** 2026-02-24

## Context

The platform has multiple business domains (grooming, clinic, hotel, shop). A microservices architecture would provide independent deployment and scaling per domain. However, only the grooming domain exists today, and the team is a single developer.

## Decision

Use a modular monolith with strict package isolation. Modules live under `com.petplatform.modules.*` and communicate via service interfaces — never via HTTP or shared DB joins across module boundaries.

## Consequences

- Single deployment unit (one Docker container on Render)
- In-process calls instead of network latency between services
- Shared database with clear schema boundaries per module
- Module extraction to microservices remains possible if a domain genuinely needs independent scaling (interfaces are already defined)
- Cannot independently scale individual modules

## Alternatives Considered

- **Microservices from day one** — operational overhead too high for a solo developer; network calls, service discovery, and distributed tracing add complexity with no current benefit
- **Traditional monolith without module boundaries** — harder to evolve later; mixing domain logic leads to the big ball of mud
