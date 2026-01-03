# Frontend - Hamster Kombat Telegram Mini App

React + TypeScript frontend for the Hamster Kombat Telegram Mini App.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Set `VITE_API_URL` to your backend URL (e.g., `https://your-backend.onrender.com`)

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

You can deploy the frontend to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to set the `VITE_API_URL` environment variable in your hosting platform.

## Telegram Mini App Setup

1. Create a bot using [@BotFather](https://t.me/botfather)
2. Set up your bot's Mini App URL in BotFather
3. The app will automatically initialize when opened in Telegram

