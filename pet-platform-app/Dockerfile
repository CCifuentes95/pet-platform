# Stage 1: Build the application
FROM gradle:8-jdk21 AS builder

WORKDIR /app

# Copy gradle files for dependency caching
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

# Download dependencies (cached layer)
RUN gradle dependencies --no-daemon || true

# Copy source code
COPY src ./src

# Build the application
RUN gradle bootJar --no-daemon

# Extract layers from the JAR using Spring Boot 4.x jarmode=tools
RUN java -Djarmode=tools -jar build/libs/*.jar extract --layers --destination extracted

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root user (Alpine uses addgroup/adduser instead of groupadd/useradd)
RUN addgroup -S spring && adduser -S spring -G spring

# Copy layers in order of least to most frequently changing
# This allows Docker to cache layers and only rebuild what changed
COPY --from=builder --chown=spring:spring /app/extracted/dependencies/ ./
COPY --from=builder --chown=spring:spring /app/extracted/spring-boot-loader/ ./
COPY --from=builder --chown=spring:spring /app/extracted/snapshot-dependencies/ ./
COPY --from=builder --chown=spring:spring /app/extracted/application/ ./

USER spring

# Render.com uses the PORT environment variable
# Default to 8080 if PORT is not set
ENV PORT=8080
EXPOSE ${PORT}

# Health check for Render.com monitoring (using wget instead of curl for Alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/actuator/health || exit 1

# Run the application with PORT environment variable
# The extracted layout creates a thin jar with the project name
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar *.jar"]
