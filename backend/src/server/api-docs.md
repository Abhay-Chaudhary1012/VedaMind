# VedaMind API Docs

Base URL: `http://localhost:4000/api`
All protected routes require: `Authorization: Bearer <token>`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | No | Mock login, returns token |
| POST | /topics/generate | Yes | Generate AI notes |
| POST | /quizzes/generate | Yes | Generate 5-question quiz |
| POST | /quizzes/submit | Yes | Submit + evaluate answers |
| GET  | /dashboard/:id | Yes | Dashboard + unlock status |
| POST | /profile/update | Yes | Update preferences |
