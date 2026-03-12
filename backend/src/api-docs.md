# VedaMind API Documentation

Base URL: `http://localhost:4000/api`

---

## Authentication

### POST /auth/login
No token required.

**Request:**
```json
{ "name": "Priya" }
```

**Response:**
```json
{
  "studentId": "uuid",
  "token": "uuid-token",
  "profile": {
    "id": "uuid",
    "name": "Priya",
    "totalLearningHours": 0,
    "unlockedTiers": [0],
    "preferences": { "style": "visual" },
    "dataLoggingOptIn": true
  }
}
```

---

## Topics

### POST /topics/generate
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "studentId": "uuid",
  "topic": "Photosynthesis",
  "level": "grade"
}
```
`level`: `"eli10"` | `"grade"` | `"advanced"`

**Response:**
```json
{
  "noteId": "uuid",
  "note": {
    "summary": "...",
    "keyPoints": ["...", "..."],
    "examples": [{ "title": "...", "content": "..." }],
    "practiceProblems": [{ "question": "...", "hint": "..." }]
  },
  "meta": { "generatedAt": "2024-01-01T00:00:00Z" }
}
```

---

## Quizzes

### POST /quizzes/generate
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "studentId": "uuid",
  "topic": "Photosynthesis",
  "difficulty": "medium"
}
```
`difficulty`: `"easy"` | `"medium"` | `"hard"`

**Response:**
```json
{
  "quizId": "uuid",
  "questions": [
    { "id": "q1", "type": "mcq", "text": "...", "options": ["A", "B", "C", "D"] },
    { "id": "q2", "type": "mcq", "text": "...", "options": ["A", "B", "C", "D"] },
    { "id": "q3", "type": "short", "text": "Explain..." },
    { "id": "q4", "type": "short", "text": "Describe..." },
    { "id": "q5", "type": "numeric", "text": "Calculate..." }
  ]
}
```
Note: `correctAnswer` is NOT included in the response (prevents cheating).

### POST /quizzes/submit
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "studentId": "uuid",
  "quizId": "uuid",
  "answers": [
    { "questionId": "q1", "answer": "B" },
    { "questionId": "q3", "answer": "Photosynthesis converts sunlight..." }
  ],
  "timings": [
    { "questionId": "q1", "timeSeconds": 15 },
    { "questionId": "q3", "timeSeconds": 45 }
  ]
}
```

**Response:**
```json
{
  "score": 78,
  "totalQuestions": 5,
  "feedback": [
    {
      "questionId": "q1",
      "grade": 100,
      "isCorrect": true,
      "analysis": "Correct! ...",
      "correctAnswer": "B",
      "suggestedProblems": ["Practice 1", "Practice 2"]
    }
  ],
  "updatedProfile": { ... },
  "unlockedNewTier": 1
}
```

---

## Dashboard

### GET /dashboard/:studentId
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "profile": { ... },
  "recentSessions": [{ "topic": "...", "hours": 0.25, "startedAt": "...", "endedAt": "..." }],
  "recentQuizzes": [{ "topic": "...", "score": 78, "createdAt": "..." }],
  "masteryScores": { "Photosynthesis": 78 },
  "unlockedTiers": [0, 1],
  "nextUnlockAt": 29,
  "hoursToNext": 19.25,
  "careerHint": null
}
```

---

## Health

### GET /health
```json
{
  "status": "ok",
  "mode": "mock",
  "timestamp": "2024-01-01T00:00:00Z"
}
```
