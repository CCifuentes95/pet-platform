# ADR-006: LLM Provider Selection (OpenAI/Groq over Bedrock/Ollama)

**Status:** Accepted
**Date:** 2026-02-24

## Context

The AI feature needs an LLM to power natural language queries over grooming domain data (availability, appointments, dashboard stats). Options range from self-hosted models to managed cloud APIs.

## Decision

Use **OpenAI API (GPT-4o-mini)** as the primary provider, with **Groq free tier (Llama 3)** as a zero-cost alternative. Spring AI abstracts both behind the same `ChatClient` interface.

```yaml
# Switch provider via config only — no code change needed
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat.options.model: gpt-4o-mini
```

## Consequences

- **OpenAI:** ~$1–2/month at portfolio traffic levels, high output quality, simple API
- **Groq:** $0/month, fast inference, good quality — viable for demos and development
- No infrastructure to host or maintain
- Spring AI's abstraction layer means switching providers is a single config change
- Vendor dependency on an external API; outages affect the AI chat feature

## Alternatives Considered

- **Amazon Bedrock** — unpredictable cost model, already present on CV, no additional portfolio value; setup complexity outweighs benefits for this use case
- **Ollama (self-hosted)** — $20–40/month compute cost to run on CPU-grade hardware; slow inference defeats the UX; contradicts the PaaS-first infrastructure decision (ADR-001)
