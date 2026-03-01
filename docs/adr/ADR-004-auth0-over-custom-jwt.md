# ADR-004: Auth0 Free Tier over Custom JWT Implementation

**Status:** Accepted
**Date:** 2026-02-24

## Context

The platform needs authentication for two roles: `ROLE_CLIENT` and `ROLE_ADMIN`. Building custom JWT auth would require login/registration endpoints, password hashing, token refresh logic, and significant security hardening — all undifferentiated work.

## Decision

Use Auth0 free tier (25,000 MAU) with Spring Security OAuth2 Resource Server on the backend and `@auth0/nextjs-auth0` on the frontend.

## Consequences

- Authentication implemented in ~1 day instead of ~1 week
- Social login (Google, GitHub) available out of the box at no cost
- Role-based access via Auth0 roles mapped to Spring Security `GrantedAuthority`
- Vendor dependency on Auth0; migration would require replacing the JWT issuer
- Less backend auth code to showcase, but the time saved goes directly into domain and AI logic

## Alternatives Considered

- **Custom JWT** — too time-consuming; security edge cases (refresh token rotation, brute force, token revocation) are not trivial
- **Keycloak** — open-source and self-hosted, but too operationally heavy for a PaaS-first setup
- **Clerk** — Next.js-focused with excellent DX, but Spring Boot integration is second-class compared to Auth0
