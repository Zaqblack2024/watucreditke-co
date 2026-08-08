# WATUCREDITKE

E-commerce starter for WATUCREDITKE — React + Tailwind frontend and Node/Express + MongoDB backend.

Structure:
- frontend/ — Vite React app with Tailwind
- backend/ — Express API with Mongoose
- docker-compose.yml — dev environment with MongoDB
- nginx/ — example nginx config for production reverse proxy
- .github/workflows/ — CI/CD for frontend/backend

See .env.example for required environment variables.

Quick local dev (Docker)
1. Copy .env.example to .env and update values.
2. docker-compose up --build
3. Frontend: http://localhost:3000
4. Backend API: http://localhost:5000/api