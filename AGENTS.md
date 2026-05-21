# AGENTS.md

## Quick start

```bash
pnpm install                    # pnpm only (v10.4.1) — never npm/yarn
pnpm run dev                    # Express + Vite HMR (server serves client in dev)
pnpm run build                  # vite build + esbuild server bundle → dist/
pnpm run check                  # tsc --noEmit (excludes test files per tsconfig.json; no separate linter)
pnpm run format                 # prettier --write .
pnpm run test                   # vitest run (server tests only, env=node)
pnpm run db:push                # drizzle-kit generate + migrate (needs DATABASE_URL)

npx vitest run server/path/to/file.test.ts   # single test file
npx vitest run -t "test name"                # single test by name
```

## Architecture

| Layer | Directory | Entrypoint |
|---|---|---|
| Server | `server/` | `server/_core/index.ts` |
| Client | `client/src/` | `client/src/main.tsx` |
| Shared | `shared/` | constants, types, errors |
| DB schema | `drizzle/schema.ts` | Drizzle ORM, MySQL, migrations in `drizzle/` |

- **API**: tRPC at `/api/trpc`, transformer = `superjson`. Router in `server/routers.ts`.
- **Procedures**: `publicProcedure`, `protectedProcedure` (authenticated). Auth via JWT in `Authorization: Bearer <token>` header (stored in localStorage on client).
- **DB**: Lazy-initialized via `getDb()` in `server/db.ts` — gracefully returns null if DATABASE_URL unset.
- **LLM**: `invokeLLM()` in `server/_core/llm.ts` uses NVIDIA API (`NVIDIA_API_KEY`). Model: `nvidia/llama-3.1-nemotron-70b-instruct` (overridable via `NVIDIA_MODEL` env var).
- **Client**: React 19, wouter (not react-router), TanStack Query, shadcn/ui (new-york style), Tailwind CSS v4 (`@import "tailwindcss"` — not `@tailwind` directives).
- **Theme**: Always-dark (`:root` = dark colors, `.dark` block is empty).
- **Env vars**: Read in `server/_core/env.ts`. Required: `DATABASE_URL`, `JWT_SECRET`, `NVIDIA_API_KEY`. No `.env.example` — copy against `env.ts`.

## Path aliases (tsconfig + vite + vitest)

```
@/       → client/src/
@shared/ → shared/
@assets/ → attached_assets/
```

## Testing quirks

- All tests run in `node` environment (no jsdom).
- Tests mock `./db` with `vi.mock()` — look at `server/akunfish.test.ts` for the pattern.
- No client tests exist.

## Conventions

- Named exports preferred. PascalCase for components/types, camelCase for functions/vars.
- Components: `PascalCase.tsx`. Utilities: `camelCase.ts`. Tests: `*.test.ts` colocated.
- Import order: externals → aliases → relatives.
- No inline comments unless explaining complex algorithms.
- tRPC errors: `TRPCError` with appropriate code — never expose internals to client.
