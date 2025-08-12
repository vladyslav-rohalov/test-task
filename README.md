# How to run 

1. In the terminal, type docker compose up -d
2. Then open http://localhost:5173

## Frontend

Pages: Login/Register, Projects (table).
Table: Server-side sorting, pagination, Refresh/Delete buttons, loaders, errors via Snackbar.

## Backend

POST /api/auth/register\
POST /api/auth/login\

GET /api/projects?page&limit&sort_by&sort_as\
POST /api/projects\
POST /api/projects/:id/refresh\
DELETE /api/projects/:id\
