# pet-platform-app

Spring Boot 4 backend for the Pet Platform — a pet grooming booking API built as a modular monolith.

## Stack

| Tool | Purpose |
|------|---------|
| Java 21 | Language (Virtual Threads enabled) |
| Spring Boot 4 | Framework |
| Spring Security | Auth (JWT / OAuth2 Resource Server via Auth0) |
| Spring Data JPA | Data access |
| Spring AI | In-process AI (OpenAI GPT-4o-mini) |
| Flyway | Database migrations |
| MapStruct | Entity ↔ DTO mapping |
| Lombok | Boilerplate reduction |
| Springdoc / Swagger UI | API documentation |
| Resilience4j | Circuit breaker |
| PostgreSQL | Database (Neon in production) |
| Gradle (Kotlin DSL) | Build tool |

## Project Structure

```
src/main/java/io/petplatform/api/
├── config/          # Security, global beans
└── modules/
    └── grooming/
        ├── domain/      # Entities (Appointment, Groomer, TimeSlot, ServiceType)
        ├── repository/  # Spring Data JPA repositories
        ├── service/     # Business logic
        ├── api/         # REST controllers + DTOs
        └── ai/          # Spring AI chat handler
```

## Getting Started

### Prerequisites

- Java 21+
- Docker

### Run locally

```bash
# Start Postgres
docker-compose up -d

# Run the app
./gradlew bootRun
```

Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
Health check: [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)

## Environment Variables

| Variable | Default (local) | Description |
|----------|----------------|-------------|
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/pet_platform` | JDBC connection string |
| `DATABASE_USERNAME` | `postgres` | DB username |
| `DATABASE_PASSWORD` | `postgres` | DB password |
| `DB_POOL_SIZE` | `5` | HikariCP max pool size |
| `AUTH0_ISSUER_URI` | — | Auth0 issuer URI (required in production) |

## Available Scripts

```bash
./gradlew bootRun          # Start dev server
./gradlew test             # Run all tests
./gradlew build            # Build JAR
./gradlew check            # Linting + tests
```

## API Overview

| Method | Path | Access | Description |
|--------|------|--------|-------------|
| GET | `/api/v1/services` | Public | List service types |
| GET | `/api/v1/availability` | Public | Available slots |
| POST | `/api/v1/appointments` | Client | Book appointment |
| GET | `/api/v1/appointments/me` | Client | My bookings |
| GET/POST/PUT | `/api/v1/admin/groomers` | Admin | Groomer CRUD |
| GET | `/api/v1/admin/dashboard/stats` | Admin | Revenue + counts |
| POST | `/api/v1/admin/ai/chat` | Admin | Natural language queries |

## Deployment

Deployed to **Render**. Merges to `main` trigger automatic deployments via GitHub Actions.
