# NextJS ♡ Enonic : Demo application

NextJS front-end demo powered by Enonic XP.

This is repo is based on a [Next.js](https://nextjs.org/) project based on [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It also includes an integration with the CMS called the Enonic Adapter.

## Tutorial
This app is the TLDR; version of the Next.XP tutorial. Visit the tutorial on the Enonic Developer portal: https://developer.enonic.com/docs/next.xp

## Usage

1. Launch Enonic instance

To use this project you will an running instance of Enonic, containing Next.js demo content.
This is available by signing up to Enonic, and creating a solution using the "Next.js demo" template.

2. Check out and configure this application

Checkout this project to your local machine and Update the `.env.development` file to reference the location of the Enonic API (you can use use either draft or master branch)

3. Start app

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next hints:

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
