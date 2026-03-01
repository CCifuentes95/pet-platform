# Pet Platform — Architecture

## Traffic Flow

```mermaid
flowchart LR
    Client(["Browser / Mobile"])
    Vercel["Vercel\nNext.js 15"]
    Render["Render\nSpring Boot 4 + Spring AI"]
    Neon[("Neon\nPostgreSQL")]
    OpenAI["OpenAI\nGPT-4o-mini"]
    Groq["Groq\nLlama 3"]

    Client -->|HTTPS| Vercel
    Vercel -->|REST / JSON| Render
    Render -->|JDBC + HikariCP| Neon
    Render -->|API| OpenAI
    Render -.->|API fallback| Groq
```

## Infrastructure

```mermaid
flowchart TB
    subgraph PaaS ["Managed PaaS  ·  $0–9 / month"]
        Vercel["Vercel (Hobby)\nNext.js frontend"]
        Render["Render (Free/Starter)\nDocker container"]
        Neon["Neon (Free)\nServerless PostgreSQL"]
    end

    subgraph Auth ["Auth & Features"]
        Auth0["Auth0 (Free)\n25K MAU"]
        LD["LaunchDarkly (Free)\nFeature flags"]
    end

    subgraph AI ["AI Layer"]
        OpenAI["OpenAI\nGPT-4o-mini (primary)"]
        Groq["Groq\nLlama 3 (fallback)"]
    end

    subgraph CI ["CI/CD"]
        GHA["GitHub Actions\nbuild · test · deploy"]
    end

    GHA -->|auto-deploy on merge| Render
    GHA -->|auto-deploy on merge| Vercel
    Vercel --> Auth0
    Render --> Auth0
    Render --> Neon
    Render --> OpenAI
    Render -.-> Groq
    Render --> LD
```

## Repository Structure

```mermaid
flowchart TD
    subgraph root ["pet-platform  (monorepo)"]
        app["pet-platform-app/\nSpring Boot 4 · Java 21"]
        ui["pet-platform-ui/\nNext.js 15 · TypeScript"]
        docs["docs/\nadr/ · architecture.md"]
        gha[".github/workflows/\napi-ci.yml · ui-ci.yml"]
    end
```

## Backend Module Structure

```mermaid
flowchart TD
    subgraph monolith ["Spring Boot Monolith  (pet-platform-app)"]
        config["config/\nSecurityConfig"]

        subgraph grooming ["modules/grooming/  (planned)"]
            api["api/\nREST controllers"]
            service["service/\nbusiness logic"]
            repo["repository/\nJPA repositories"]
            domain["domain/\nentities"]
            ai["ai/\nSpring AI functions"]
        end
    end

    api --> service
    service --> repo
    repo --> domain
    ai -->|calls in-process| service
    config -.->|visible to all modules| grooming
```

## Domain Model — Grooming Module

```mermaid
erDiagram
    GROOMER {
        uuid id PK
        string name
        string specialization
    }
    SERVICE_TYPE {
        uuid id PK
        string name
        int duration_minutes
        decimal price
    }
    TIME_SLOT {
        uuid id PK
        uuid groomer_id FK
        date slot_date
        time slot_time
        string status
        int version "optimistic locking"
    }
    APPOINTMENT {
        uuid id PK
        uuid groomer_id FK
        uuid time_slot_id FK
        uuid service_type_id FK
        string client_auth0_id
        string status
        int version "optimistic locking"
    }

    GROOMER ||--o{ TIME_SLOT : "has"
    GROOMER ||--o{ APPOINTMENT : "performs"
    TIME_SLOT ||--o| APPOINTMENT : "booked by"
    SERVICE_TYPE ||--o{ APPOINTMENT : "defines"
```

## Appointment Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING : POST /appointments
    PENDING --> CONFIRMED : admin confirms
    CONFIRMED --> COMPLETED : service delivered
    PENDING --> CANCELLED : client or admin cancels
    CONFIRMED --> CANCELLED : client or admin cancels
    COMPLETED --> [*]
    CANCELLED --> [*]
```

## Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant Next.js as Next.js (pet-platform-ui)
    participant Auth0
    participant API as Spring Boot (pet-platform-app)

    User->>Next.js: clicks Login
    Next.js->>Auth0: redirect to /authorize
    Auth0-->>User: login form
    User->>Auth0: credentials
    Auth0-->>Next.js: authorization code
    Next.js->>Auth0: exchange for tokens
    Auth0-->>Next.js: JWT (access token)
    Next.js->>API: request + Bearer JWT
    API->>Auth0: validate JWT (JWKS)
    Auth0-->>API: valid
    API-->>Next.js: 200 response
```

## AI Chat Flow (Admin)

```mermaid
sequenceDiagram
    actor Admin
    participant Next.js as Next.js (pet-platform-ui)
    participant API as Spring Boot (pet-platform-app)
    participant Spring AI
    participant OpenAI
    participant Services as Domain Services

    Admin->>Next.js: "What's available tomorrow for large dogs?"
    Next.js->>API: POST /api/v1/admin/ai/chat
    API->>Spring AI: chat(userMessage)
    Spring AI->>OpenAI: prompt + function definitions
    OpenAI-->>Spring AI: function_call: getAvailability(date, service)
    Spring AI->>Services: AvailabilityService.getSlots(...)
    Services-->>Spring AI: available slots
    Spring AI->>OpenAI: function result
    OpenAI-->>Spring AI: natural language response
    Spring AI-->>API: formatted answer
    API-->>Next.js: { message: "..." }
    Next.js-->>Admin: displays response
```
