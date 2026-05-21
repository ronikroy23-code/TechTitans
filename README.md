# AI Learning Companion — Auth

Premium startup-style authentication UI with **Supabase email/password** auth.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase Auth

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Authentication → Providers**, ensure **Email** is enabled.
3. Under **Authentication → URL Configuration**, add your site URL (e.g. `http://localhost:5173`) to **Site URL** and **Redirect URLs**.
4. Copy **Project URL** and **anon public** key from **Settings → API**.
5. Create `.env` from the example:

```bash
cp .env.example .env
```

Fill in:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

### Email confirmation (optional)

If **Confirm email** is enabled in Supabase, new users must click the link in their inbox before logging in. The app shows: *"Check your email to confirm your account, then log in."*

To disable for local dev: **Authentication → Providers → Email** → turn off **Confirm email**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Auth flow

| Action | Supabase API |
|--------|----------------|
| Sign up | `auth.signUp({ email, password })` |
| Log in | `auth.signInWithPassword({ email, password })` |
| Forgot password | `auth.resetPasswordForEmail(email)` |
| Session | `onAuthStateChange` + persisted session |
| Sign out | `auth.signOut()` |

After login, a simple dashboard shows the signed-in email. Replace `Dashboard.tsx` with your main app when ready.

## Build

```bash
npm run build
npm run preview
```
