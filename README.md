# Fi Swarm — AI-Powered SME Financial Intelligence

> **Track:** AI in Finance & Business — AI Agent Sol Hackathon, Bingham University

**Live App:** [https://fi-fine-production.up.railway.app](https://fi-fine-production.up.railway.app)  
**GitHub:** [https://github.com/ln-tc999/fi-fine](https://github.com/ln-tc999/fi-fine)

---

## Problem

Small and medium enterprises (SMEs) across Africa and beyond struggle with **cashflow uncertainty**. Most lack access to affordable financial analysts or sophisticated forecasting tools. Decisions about inventory, hiring, and investment are made blindly — leading to missed opportunities or preventable failures.

Traditional accounting software records history but **cannot predict the future**. Financial modeling requires expertise most SME owners don't have.

## Solution

Fi Swarm is a **multi-agent AI simulation platform** that forecasts SME cashflow using four collaborative LLM agents:

| Agent | Perspective |
|---|---|
| **Owner** | Business strategy, profit margins, growth decisions |
| **Supplier** | Supply chain health, payment terms, procurement risk |
| **Customer** | Demand patterns, price sensitivity, purchasing behavior |
| **Bank** | Creditworthiness, liquidity ratios, loan eligibility |

Each agent analyzes the same business data but from its unique viewpoint. Together, they produce **more accurate, multi-dimensional cashflow projections** than any single-agent approach.

The system automatically:
- Generates a **12-month cashflow forecast** with confidence scoring
- Detects **financial risks** (Low / Medium / High / Critical)
- Produces a **professional 9-slide PDF pitch deck** with charts, KPIs, and recommendations
- Allows users to **chat with individual agents** for deeper insights

## Features

- **Dashboard** — Real-time KPI cards, income vs expense bar charts, net cashflow trends
- **Transaction Management** — Log income/expense/invoice records, import CSV/Excel
- **Multi-Agent Simulation** — 4-step wizard: seed data → configure scenarios → launch LLM agents → receive report
- **Risk Alert System** — Automatic detection and severity classification of financial risks
- **AI Chat** — Conversational interface to query individual simulation agents
- **Pitch Deck Export** — Auto-generated 9-slide PDF presentation ready for investors or stakeholders
- **Quick Demo** — Pre-seeded demo environment to explore all features without signing up

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, Recharts, wouter |
| **Backend** | Node.js, Express, tRPC, Drizzle ORM |
| **Database** | MySQL (Railway) |
| **AI / LLM** | NVIDIA API — `nvidia/llama-3.3-nemotron-super-49b-v1` |
| **PDF Export** | Puppeteer Core + `@sparticuz/chromium` |
| **Auth** | JWT (localStorage-based) |
| **Deployment** | Railway (Nixpacks) |

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌───────────┐
│  React SPA  │────▶│  tRPC API   │────▶│  NVIDIA   │
│  (Vite)     │     │  (Express)  │     │  LLM API  │
└─────────────┘     └──────┬──────┘     └───────────┘
                           │
                    ┌──────▼──────┐
                    │   MySQL DB  │
                    │  (Railway)  │
                    └─────────────┘
```

## AI Models & Tools Used

| Tool | Purpose |
|---|---|
| `nvidia/llama-3.3-nemotron-super-49b-v1` | Core LLM for multi-agent simulation |
| NVIDIA API (`integrate.api.nvidia.com`) | LLM inference endpoint |
| Puppeteer + Chromium | PDF generation for pitch deck export |
| Drizzle ORM | Database schema and migrations |
| tRPC | End-to-end typesafe API |
| Vite + esbuild | Build tooling |

## How to Run Locally

```bash
pnpm install
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, NVIDIA_API_KEY
pnpm run dev           # starts Express + Vite HMR
```

### Build & Deploy

```bash
pnpm run build         # Vite (client) + esbuild (server) → dist/
pnpm run start         # NODE_ENV=production node dist/index.js
```

### Tests

```bash
pnpm run test          # 57 tests (pitch deck, seed generation, import)
```

## Team Roles

*To be filled with team member names and roles.*

| Role | Name |
|---|---|
| Technical Lead | |
| Domain Expert (Finance/Business) | |
| Designer / Communicator | |
| Wildcard | |

## License

MIT — Built for the AI Agent Sol Hackathon, Bingham University.
