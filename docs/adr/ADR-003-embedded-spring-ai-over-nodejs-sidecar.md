# ADR-003: Embedded Spring AI over Node.js Sidecar

**Status:** Accepted
**Date:** 2026-02-24

## Context

The original architecture proposed a separate Node.js/Fastify service running MCP (Model Context Protocol) to handle AI admin queries. This would require a second deployment, a second runtime, and HTTP calls between services for every AI request.

## Decision

Embed AI capabilities directly in the Spring Boot monolith using [Spring AI](https://spring.io/projects/spring-ai). AI functions call domain service methods in-process via Spring AI's function calling support.

## Consequences

- Single deployment, single runtime
- AI functions call `AvailabilityService` and `GroomingService` directly — no HTTP overhead or serialization
- Tight coupling between AI layer and domain (acceptable — they evolve together)
- No need for the MCP protocol or a separate Node.js toolchain
- Slightly larger monolith JAR
- Spring AI abstracts the LLM provider; switching providers is a config change

## Alternatives Considered

- **Node.js MCP sidecar** — added operational complexity, separate deployment, HTTP round-trips on every query
- **LangChain4j** — viable Java AI framework, but Spring AI has tighter Spring Boot autoconfiguration and first-class function calling support
