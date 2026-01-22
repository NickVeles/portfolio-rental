# Portfolio Rental

A property rental application with a Next.js frontend and Express backend.

## Structure

```
packages/
  client/   - Next.js frontend
  server/   - Express backend with Prisma
  shared/   - Shared types and Prisma client
```

## Setup

```bash
npm install
npm run prisma:generate
```

## Development

```bash
npm run dev:client   # Start frontend
npm run dev:server   # Start backend
```

## Database

```bash
npm run prisma:generate  # Generate Prisma client
npm run seed             # Seed database
```
