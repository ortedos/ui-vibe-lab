# UI Vibe Lab

AI-assisted UX review from interface screenshots.

## Why this repo exists
This project is meant to show fast experimentation around UX critique, product taste, and AI-assisted review workflows.

## What it does
- accepts two UI screenshots
- asks for the interface context
- generates a concise UX review
- highlights findings and prioritized actions

## Stack
- Next.js
- TypeScript
- OpenAI API (optional)

## Demo mode
The starter runs without a multimodal model. It uses the provided context string and returns a portfolio-friendly fallback review.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## How to extend
To support real image analysis, replace the current `/api/review` logic with a multimodal request and send base64 images or uploaded asset URLs.

## Resume line
Built an AI-assisted UX critique tool that compares interface directions and outputs prioritized usability recommendations.
