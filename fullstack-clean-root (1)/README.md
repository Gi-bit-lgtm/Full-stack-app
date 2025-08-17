# One-Deploy Expense Tracker (Render/Railway)

This single project hosts **backend + frontend** together on one URL.
- Build: `npm run build` (builds React)
- Start: `npm start` (starts Express)
- Express serves React build from `client/dist` and exposes `/api/...`

## Deploy on Render (no GitHub needed)
1. Zip this entire folder.
2. In Render: New → Web Service → Manual Deploy (upload ZIP).
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Environment → Add from `.env` (Render > Variables) or rely on included `.env` (recommended to move into Render for security).

## Local Dev (optional)
- Terminal 1:
  ```bash
  npm run build && npm start
  ```
- Or run backend and frontend separately by running `client` dev; here we rely on the integrated flow.

## Security
Rotate your MongoDB user password after first deploy. Keep `.env` secret.
