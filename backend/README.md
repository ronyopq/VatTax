# Backend MVP (Next Step)

This folder bootstraps the backend foundation for the VAT calculator.

## Goals
- Centralize calculations in backend API
- Persist calculation history and audit logs
- Support role-based access (admin, operator, viewer)
- Keep frontend responsive with stable contracts

## Suggested Stack
- Runtime: Node.js 20+
- Framework: Fastify (or Express)
- Database: PostgreSQL
- Auth: JWT access + refresh tokens
- Validation: Zod/Joi

## Initial Endpoints
- `POST /api/v1/calculate`
- `POST /api/v1/history`
- `GET /api/v1/history`
- `GET /api/v1/categories`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

See:
- `schema.sql` for DB schema
- `openapi.yaml` for API contract

## Implementation Sequence
1. Create DB using `schema.sql`
2. Implement auth routes and middleware
3. Implement categories + calculate endpoint
4. Implement history write/read with pagination
5. Add audit logging to mutation endpoints
6. Wire frontend to API with fallback to local mode
