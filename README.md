# NextJS ♡ Enonic : Front-end part of the Enonic/Next.js headless CMS demo

This is repo is based on a [Next.js](https://nextjs.org/) project based on [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It also includes an integration with the CMS called the Enonic Adapter.

## Running demo in the cloud
Follow the TLDR; instructions listed on the front-page of this tutorial: https://developer.enonic.com/docs/next.xp

## Running demo locally
1. Launch local Enonic SDK sandbox (https://developer.enonic.com/start)
2. Launch Enonic XP admin from http://localhost:8080 
4. From XP menu - Applications - Install the "Next.js demo" app from Enonic Market (back-end part of demo)
4. Configure and run the Next.js app "nextjs-enonic-demo" (front-end part of demo)
```bash
npx degit git@github.com:enonic/nextjs-enonic-demo.git
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
