# Tejas Labs

**Proprietary and confidential software.** Copyright (c) 2026 Tejas Labs. All rights reserved.

This repository is not open source. No permission is granted to copy, modify,
redistribute, publish, reverse engineer, use to train an AI system, or use with
an AI system to create derivative works. See [LICENSE.md](./LICENSE.md) for the
complete terms.

Access is restricted to Tejas Labs and people who have written authorization
from Tejas Labs. Keep the repository private, never commit credentials, and do
not share source archives, build artifacts, or deployment access outside that
authorized group.

## Deployment control

Automatic Vercel deployments from Git are intentionally disabled in
[`vercel.json`](./vercel.json). A project owner can re-enable Git deployments
in Vercel Project Settings or deploy a reviewed revision manually when ready.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment

The contact form on the site emails a brief to the studio Gmail. To make that work locally and in production, copy `.env.example` to `.env.local` and set the values described there (`NEXT_PUBLIC_SITE_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`). The form will surface a clear error if those aren't set.
