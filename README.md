# BookListFull

[![CI](https://github.com/zamine-dots/BookListFull/actions/workflows/ci.yml/badge.svg)](https://github.com/zamine-dots/BookListFull/actions/workflows/ci.yml)

A personal reading-list app built with React, Appwrite, and the Open Library API. Search for books, create an account, and keep a list of favorites.

## Features

- Email/password registration, sign-in, and session-based routes.
- Open Library search with book titles, authors, and cover images.
- Add and remove favorites stored in Appwrite.
- Clear feedback when a favorite cannot be saved, with the existing state preserved.
- Titles and authors remain visible for books without a cover image.

This project demonstrates external API integration, account flows, reusable UI components, and persistent user data.

## Run locally

Use **Node.js 24 LTS** (24.15 or later).

```bash
npm ci
cp .env.example .env.local
# Fill in your public Appwrite endpoint and resource IDs.
npm run dev
```

Appwrite configuration is required for the account and favorites screens. `VITE_` variables are exposed in the browser bundle: use only public endpoint/resource IDs, never an Appwrite server API key.

| Variable | Value |
| --- | --- |
| `VITE_APPWRITE_ENDPOINT` | Your Appwrite endpoint, including `/v1` |
| `VITE_APPWRITE_PROJECT_ID` | Project ID |
| `VITE_DB_ID` | Database ID |
| `VITE_COLLECTION_Users_ID` | Users collection ID |
| `VITE_COLLECTION_Favbooks_ID` | Favorites collection ID |

## Appwrite setup

Enable email/password authentication and register a Web platform for `localhost` and your deployed hostname. Create these collections in the configured database:

| Collection | String attributes used by the app |
| --- | --- |
| Users | `email`, `fullName` |
| Favorites | `UserID`, `coverUrl`, `bookTitle`, `bookAuther` |

The spelling **`bookAuther`** is part of the current schema and is retained for existing installations. Provide indexes for favorites queries on `UserID` and on `UserID` + `coverUrl`; size string attributes to fit titles and cover URLs.

Enable document security. Allow authenticated users to create documents, and keep read/update/delete access limited to the document owner. The client omits an explicit document-permissions argument, so verify your Appwrite version's creator-permission defaults and test with two separate accounts before deployment. A `UserID` query alone is not an access-control boundary.

## Search proxy and deployment

The browser requests `/api/search`. Vite proxies this to Open Library's `/search.json` in development and preview. `vercel.json` supplies the equivalent production rewrite and SPA fallback.

```bash
npm run lint
npm test
npm run build    # dist/
npm run preview
```

On Vercel, configure the public environment variables, use `npm run build`, and publish `dist/`. Other hosts need the same search proxy and SPA fallback; copying `dist/` alone does not supply `/api/search`.

## Validation and current limits

CI runs lint, favorite-toggle regression tests, the production build, and a dependency audit. The tests mock authentication and storage responses; they cover removing a saved book without losing its author and keeping the current state when a save fails.

Appwrite permissions, real account creation, and database writes require a configured Appwrite project and separate integration testing. This repository does not claim those services are provisioned by CI.
