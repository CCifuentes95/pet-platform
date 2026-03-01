# ADR-005: No Separate Booking Module (YAGNI)

**Status:** Accepted
**Date:** 2026-02-24

## Context

The original architecture had a standalone `module-booking` described as "the heart of the system" — a cross-cutting module that would coordinate scheduling across grooming, hotel, and clinic domains. Today, only the grooming domain exists.

## Decision

Make booking (`Appointment`, `TimeSlot`, availability logic) a concept inside the `grooming` module. Do not create a separate booking module.

```
com.petplatform.modules.grooming.domain.Appointment  ✓
com.petplatform.modules.booking.domain.Appointment   ✗  (premature)
```

## Consequences

- Simpler architecture: one module owns the full grooming lifecycle end-to-end
- No premature abstraction for coordination that does not yet exist
- When a second module (e.g., clinic) genuinely needs scheduling, shared logic will be extracted at that point with a real use case driving the design
- `Appointment`, `TimeSlot`, and `AvailabilityService` live inside `grooming/`

## Alternatives Considered

- **Standalone `module-booking` from day one** — violates YAGNI; there is no second consumer today. Abstractions built without a real second use case tend to be the wrong shape when the second use case eventually arrives.
