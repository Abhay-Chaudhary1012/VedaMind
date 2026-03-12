# VedaMind — MentorMind AI 🧠

> *"Students should not fit the education system — the education system should adapt to the student."*

**VedaMind** is a full-stack AI learning companion for Class 6–10 students, featuring adaptive notes, quiz generation, real-time feedback, a learning dashboard with tiered unlocks, and career hints powered by OpenAI (with a full mock mode for offline demos).

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- (Optional) MongoDB running locally or via Docker
- (Optional) OpenAI API key

### 1. Clone and Install
```bash
git clone https://github.com/your-org/vedamind-mentor-mind-ai
cd vedamind-mentor-mind-ai
npm install          # installs root concurrently
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env as needed (see sections below)
```

### 3. Run in MOCK mode (no OpenAI key, no DB needed)
```bash
# Leave OPENAI_API_KEY blank and MONGO_URI blank in .env
npm run dev:all
# Frontend → http://localhost:5173
# Backend  → http://localhost:4000
```

### 4. Run in LIVE mode (with OpenAI)
```bash
# Set OPENAI_API_KEY=sk-... in backend/.env
npm run dev:all
```

---

## 🗄️ Database Configuration

### Option A: MongoDB (Primary)
```env
MONGO_URI=mongodb://localhost:27017/vedamind
```
Start MongoDB with Docker: `docker-compose up mongo -d`

### Option B: SQLite via Prisma (Fallback)
1. Comment out `MONGO_URI` and set `DATABASE_URL="file:./dev.db"` in `.env`
2. Run migrations:
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```
3. Replace mongoose imports in controllers with PrismaClient queries (see `prisma/schema.prisma`)

### No Database (In-Memory)
Leave both `MONGO_URI` and `DATABASE_URL` blank — the app uses an in-memory store with seeded mock profiles. **Perfect for demos.**

---

## 🐳 Docker (MongoDB + Backend)
```bash
OPENAI_API_KEY=sk-... docker-compose up
```
This starts MongoDB and the backend. Run the frontend separately: `cd frontend && npm run dev`.

---

## 📡 API Reference

### POST /api/auth/login
```json
// Request
{ "name": "Priya" }
// Response
{ "studentId": "student_priya", "token": "uuid", "name": "Priya" }
```

### POST /api/topics/generate
```bash
curl -X POST http://localhost:4000/api/topics/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"studentId":"student_priya","topic":"Photosynthesis","level":"grade"}'
```

### POST /api/quizzes/generate
```bash
curl -X POST http://localhost:4000/api/quizzes/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"studentId":"student_priya","topic":"Algebra","difficulty":"medium"}'
```

### POST /api/quizzes/submit
```bash
curl -X POST http://localhost:4000/api/quizzes/submit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"studentId":"student_priya","quizId":"quiz_xxx","answers":[{"questionId":"q1","answer":"B. The core definition"}],"timings":[{"questionId":"q1","timeSeconds":15}]}'
```

### GET /api/dashboard/:studentId
```bash
curl http://localhost:4000/api/dashboard/student_priya \
  -H "Authorization: Bearer <token>"
```

---

## 🧪 Tests
```bash
npm run test:all
# Or individually:
cd backend && npm test
cd frontend && npm test
```

---

## 🔓 Tier Unlock Logic
| Tier | Requirement | Features Unlocked |
|------|-------------|-------------------|
| 0    | Always      | Notes, Basic Quiz, Feedback |
| 1    | 10 hours    | Analytics, Score Trends |
| 2    | 29 hours OR significant score improvement | Career Hints, Advanced Tutor |

**Demo shortcut:** Log in as `Priya` (32 hours) to see Tier 2 features immediately.

---

## 🎥 Recording the Demo (LinkedIn 9:16)
1. Navigate to `http://localhost:5173/demo/share`
2. Open browser DevTools → set device to iPhone 12 Pro (390×844)
3. Log in as **Priya**, enter topic "Algebra", click "Generate Notes"
4. Switch to Quiz tab, take the quiz, submit — see feedback
5. Scroll to Dashboard — career hint visible (Tier 2 unlocked)
6. Record 60–90 seconds in portrait mode

**LinkedIn checklist:**
- [ ] Record at 1080×1920 (9:16) or crop to it
- [ ] Keep under 90 seconds
- [ ] Add captions mentioning the mock mode (no API key needed)
- [ ] Update team LinkedIn/GitHub links from `https://xyz.com`

---

## 👥 Updating Team Links
Search for `https://xyz.com` in the codebase and replace:
- `frontend/src/components/Footer.tsx`
- `frontend/src/pages/About.tsx`

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy /dist to Vercel or Netlify
```

### Backend → Render / Heroku
- Set env vars: `PORT`, `MONGO_URI`, `OPENAI_API_KEY`, `JWT_SECRET`
- Build command: `npm run build`
- Start command: `node dist/index.js`

---

## 🔒 Privacy & Data Handling
- **No images or video stored** at any point
- Student data (name, scores, hours) stored locally/in-memory by default
- Cloud storage requires explicit `optInLogging: true` flag per student
- No advertising, no third-party data sharing
- Only aggregated/anonymised data if exported
- Delete your profile: contact the admin or clear the MongoDB collection
- All LLM calls use your own API key — Anthropic/OpenAI policies apply

### Privacy Policy Stub
VedaMind collects: student name, quiz scores, session timestamps, and topic preferences. This data is used solely to personalise the learning experience. It is not shared with third parties. Users may opt out of logging at any time.

---

## 🛠️ Dev Tooling
- ESLint + Prettier configured in both workspaces
- Husky pre-commit hooks (add with `npx husky init` if needed)
- GitHub Actions CI on push (see `.github/workflows/ci.yml`)
