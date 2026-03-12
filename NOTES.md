# VedaMind — Developer Notes & Roadmap

## ✅ What's Built (v1)
- Full-stack prototype: React frontend + Express backend, both TypeScript
- Mock mode: fully functional without OpenAI key or any database
- Three mock student profiles (Priya/Raj/TestUser) with seeded data
- Tier unlock logic (0/1/2) with progress bar
- AI notes accordion, AI quiz with MCQ + short answer, evaluation feedback
- Dashboard mini with CSS bar chart and career hints (Tier 2)
- LLM prompt templates as reusable typed functions
- Prisma schema (SQLite) + Mongoose models (MongoDB) — both complete
- GitHub Actions CI, Docker Compose, PWA manifest
- Responsive dark/light theme with Framer Motion animations

## ⚠️ Known Limitations
1. **Auth is mock-only** — Bearer token is just a UUID from in-memory store. Replace with JWT in production.
2. **Learning hours don't auto-accumulate** — currently static from mock profiles. Need a session timer that POSTs to `/api/profile/update` on tab close.
3. **Quiz answers not hidden from network tab** — in live mode, correct answers are stripped; in mock mode they're available. Add server-side evaluation only flow for production.
4. **No real-time multiplayer/sync** — each tab is independent.
5. **Prisma SQLite fallback** requires manual controller rewrites — the controllers currently use the in-memory store when Mongo is absent, not Prisma directly.

## 🔮 Future Features (v2)
- [ ] Real JWT authentication + student accounts
- [ ] Session timer that auto-records learning hours
- [ ] Mentor dashboard with class-level analytics
- [ ] Spaced repetition scheduler for weak topics
- [ ] Voice input for answers (Web Speech API)
- [ ] Offline-first PWA with service worker caching
- [ ] Multi-subject curriculum mapping (NCERT)
- [ ] Parent/guardian visibility portal
- [ ] Gamification: streaks, badges, leaderboard

## 🔧 Immediate Next Steps to Make Production-Ready
1. Replace mock auth with `jsonwebtoken` — 30 min work
2. Add session timer (frontend: useEffect + beforeunload POST) — 1 hour
3. Seed the in-memory store from Prisma/SQLite so data persists across restarts
4. Add rate limiting middleware (`express-rate-limit`) to all AI endpoints
5. Add input sanitisation for topic names (prevent prompt injection)
6. Replace `https://xyz.com` team links with real URLs

## 📐 Architecture Decisions
- **Mock-first**: The entire demo works without any external services — this was intentional for hackathon/demo settings.
- **Unified store abstraction**: `studentStore.ts` shields controllers from DB changes.
- **Prompts as code**: All LLM prompts are typed TypeScript functions in `prompts.ts` — easy to version and test.
- **In-memory quiz cache**: Quizzes are stored in `memStore.quizzes` for evaluation — this is cleared on restart. Use Redis for production.
