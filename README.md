# GitHub Stats Dashboard

Search any GitHub username to see a dashboard of their profile, top repositories, language breakdown, and largest repositories.

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

### 1. Create a GitHub token

The app calls the GitHub API with a personal access token. Create a [fine-grained token](https://github.com/settings/personal-access-tokens/new) with **Public repositories (read-only)** access and no other permissions.

### 2. Add it to an env file

Create `.env.local` in the project root:

```sh
VITE_GITHUB_TOKEN=your_token_here
```

`.env.local` is git-ignored, so don't commit the token.

> ⚠️ Vite builds any `VITE_` variable into the browser bundle, so anyone can read it on a deployed site. Only ever use a token with no permissions beyond reading public data.

### 3. Install and start

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
