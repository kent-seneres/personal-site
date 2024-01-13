## Blog Posts

All of the blog post entries are markdown files stored in the repository under `data/md/blog`. Each file should contain a preamble at the top with all the necessary metadata:

```
---
title: example title
description: example

published: true or false
datePublished: date string, e.g. 2024/01/07

tags:
  - bullet list
  - of tags
---
```

### Adding Posts

The files are automatically processed at build time to generate corresponding endpoints. Creating a new post to the site is as simple as inserting a new file in the `data/md/blog` directory.

- create new post markdown file
- set appropriate metadata at the top of the file
- redeploy app

## Photos

All of the images in the Photos page are stored in Google Drive. The files are statically incorporated at build time, and the app leverages Next.js `Image` component features to dynamically load the files at runtime. This means that the files are accessed from Google Drive once at build time, and then stored and accessed through Next.js CDN.

The google drive build time integration uses the `@googleapis/drive` library. A couple environment variables are required:

- `GOOGLE_DRIVE_CLIENT_EMAIL`
- `GOOGLE_DRIVE_PRIVATE_KEY`
- `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`

### Adding Photos

- upload photos to Google Drive folder `Personal Site/Photos`
  - optional: set file description in google drive webview to be used as caption
- compress to smaller size (less than 1 MB)
  - `mogrify -define jpeg:extent=500kb *.jpg`
- redeploy app

## Database

The app currently uses Redis to persist a few bits of data

- guestbook entries
- `/reveal` word

The redis access is managed through an environment variable, locally through `.env.local` and in production through Vercel build environments.

The `REDIS_URL` env is `redis://${user}:${password}@${public db endpoint}`
