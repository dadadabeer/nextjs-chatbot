This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Google OAuth (Sign in with Google)

If you get **401 invalid_client** or "The OAuth client was not found":

1. **Google Cloud Console** → APIs & Services → Credentials → your **Web application** OAuth client.
2. Copy the **Client ID** (ends in `.apps.googleusercontent.com`) and **Client secret**.
3. In your **.env** (not .env.example), set:
   - `AUTH_GOOGLE_ID=` paste the full Client ID (no spaces or quotes).
   - `AUTH_GOOGLE_SECRET=` paste the Client secret.
   - `NEXTAUTH_URL=http://localhost:3000` (or the URL you open in the browser; required when running in Docker).
4. **Authorized redirect URIs** in the same OAuth client must include exactly: `http://localhost:3000/api/auth/callback/google`.
5. If the app is in **Testing**, add your Google account under OAuth consent screen → Test users.
6. When using Docker: run with `--env-file .env` so the container gets these variables.

## Docker

**Build the image:**

```bash
docker build -t nextjs-chatbot .
```

**Run the container:**

```bash
docker run -d -p 3000:3000 --env-file .env nextjs-chatbot
```

Then open [http://localhost:3000](http://localhost:3000).

**Stop and remove the container:**

```bash
docker stop nextjs-chatbot && docker rm nextjs-chatbot
```

To run again after that, use the same `docker run` command above.

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
