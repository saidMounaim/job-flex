# Job Flex

Job Flex Using Next.js 14, Prisma, TailwindCSS & Clerk 🤩

![screenshot](https://i.ibb.co/wCRyF6c/Capture.png)
![screenshot](https://i.ibb.co/bKygpSX/Capture1.png)
![screenshot](https://i.ibb.co/5GG7Dmb/Capture3.png)

## Features:

- Post a job
- Approve or delete a job
- Admin dashboard
- Upload file to Vercel blob

## Technology Stack:

- Next.js
- Clerk
- Prisma
- TypeScript
- TailwindCSS
- Shadcn UI

## Usage

### Env Variables

Create a .env file in then root and add the following

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER="default"
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE="verceldb"

BLOB_READ_WRITE_TOKEN=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Install Dependencies

```
npm install
```

### Run

```
# Run project
npm run dev
```

- Version: 1.0.0
- License: MIT
- Author: Said Mounaim
