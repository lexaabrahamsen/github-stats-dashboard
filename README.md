# GitHub Stats Dashboard

Search any GitHub username to see a dashboard of their profile, top repositories, language breakdown, and largest repositories.

**[Live demo →](https://lexa-github-stats-dashboard.netlify.app/)**

## Features

- **Username search** that opens a shareable profile page (`/user?id=<username>`)
- **Profile header** with avatar, name, and follower/following counts
- **Top repositories:** the user's top 8 at a glance
- **Language breakdown** chart across a user's repos
- **Repository size** widget showing the 10 largest repos
- Loading and "user not found" states

## Built with

React · TypeScript · Vite · Material UI (incl. MUI X Charts) · TanStack Query · React Router · Recharts · Framer Motion

Data comes from the [GitHub REST API](https://docs.github.com/en/rest).

## Run locally

### 1. (Optional) Add a GitHub token

The app works without a token, using GitHub's anonymous API limit of 60 requests an hour per visitor. Loading one profile takes about 30, so a token helps if you search often.

To use one, create a [fine-grained token](https://github.com/settings/personal-access-tokens/new) with **Public repositories (read-only)** access and no other permissions, then add it to `.env.local` in the project root:

```sh
VITE_GITHUB_TOKEN=your_token_here
```

`.env.local` is git-ignored, so don't commit the token.

> ⚠️ Vite builds any `VITE_` variable into the browser bundle, so anyone can read it on a deployed site. Only ever use a token with no permissions beyond reading public data.

### 2. Install and start

This project uses Yarn (`yarn.lock`):

```sh
yarn
yarn dev
```

With npm, pass `--legacy-peer-deps` to install, because of an MUI peer-dependency conflict:

```sh
npm install --legacy-peer-deps
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

---

Built by [Lexa Wong](https://www.lexawong.dev/)
