# NextJS ♡ Enonic : Front-end part of the Enonic/Next.js headless CMS demo

This is repo is based on https://github.com/enonic/nextjs-enonic-template and represents the end-result of completing the Next.xp tutorial: https://developer.enonic.com/docs/next.xp

## Running demo in the cloud
Follow the TLDR; instructions listed on the front-page of the tutorial referenced above.

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

## Releasing new version

### Prepare demo repo

1. Create new features in a branch
2. Test and verify the app
3. Update docs if needed
4. Create pull-request to master on github
5. Tag master using `git tag v0.9.0` after pull-request is merged

### Update template repo

6. Move all relevant changes to a feature branch in the template repo
7. Test and verify the changes
8. Create pull-request to master on github
9. Tag master branch using `git tag v0.9.0` after pull-request is merged

### Final step: Release

10. Merge changes to master for both repositories
11. Verify that setting up new next app is working according to tutorial
12. Verify that the TLDR; is working
