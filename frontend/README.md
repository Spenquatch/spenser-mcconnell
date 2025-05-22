# SpenserMcConnell.com Frontend

This is the Next.js 14 frontend application for SpenserMcConnell.com, a personal brand hub featuring a project portfolio, public updates timeline, AI A Day newsletter, and more.

## Project Overview

This frontend application is built with Next.js 14 using the App Router and TypeScript. It's designed to work within a monorepo structure alongside a Strapi backend and other services. The application features:

- Modern, responsive design with Tailwind CSS
- App Router with organized routing structure
- Incremental Static Regeneration (ISR) for dynamic content
- Redis caching integration
- Docker Compose integration for local development

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for full-stack development)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Spenquatch/spenser-mcconnell.git
   cd spenser-mcconnell
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker Compose

To run the entire stack (frontend, backend, and services):

1. Ensure Docker and Docker Compose are installed
2. From the root directory:
   ```bash
   docker compose up -d
   ```
3. Access the frontend at [http://localhost:3000](http://localhost:3000)

## Environment Variables

The frontend uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL of the Strapi API | `http://localhost:1337` |
| `NEXT_PUBLIC_SITE_URL` | URL of the frontend site | `http://localhost:3000` |
| `REDIS_URL` | Redis connection URL | `redis://redis:6379` |
| `REDIS_PASSWORD` | Redis password (if required) | `` |
| `REDIS_USERNAME` | Redis username (if required) | `default` |
| `NEXT_PUBLIC_ENABLE_ISR_DEMO` | Toggle ISR demo features | `true` |

Copy `.env.example` to `.env.local` for local development or to `.env` for Docker Compose.

## Docker Compose Integration

The project includes a `docker-compose.yml` file at the root level that has been updated to include:

1. A frontend service running Next.js
2. A Redis service for caching
3. Integration with the existing Strapi backend and PostgreSQL services

Changes made to the Docker Compose configuration:
- Added frontend service with volume mounts for development
- Added Redis service with persistence
- Configured networking between all services
- Set up environment variable passing

## Folder Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── app/              # App Router pages and layouts
│   │   ├── projects/     # Projects routes
│   │   │   └── [slug]/   # Dynamic project page with ISR
│   │   ├── updates/      # Updates timeline
│   │   ├── resources/    # Resources page
│   │   ├── press-kit/    # Press kit page
│   │   ├── booking/      # Booking page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   │   └── layout/       # Layout components (Header, Footer, etc.)
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── services/         # Service integrations
│   │   └── redis.ts      # Redis service
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── .env.example          # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── Dockerfile            # Docker configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## NPM Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start the development server |
| `build` | Build the application for production |
| `start` | Start the production server |
| `lint` | Run ESLint to check code quality |
| `format` | Run Prettier to format code |
| `type-check` | Run TypeScript type checking |

## Incremental Static Regeneration (ISR)

This project demonstrates ISR using the `/projects/[slug]` route. Key implementation details:

1. **Static Generation**: The `generateStaticParams` function pre-renders specific paths at build time.
2. **Revalidation**: The `revalidate` export sets a 60-second revalidation period.
3. **Dynamic Metadata**: The `generateMetadata` function provides dynamic SEO metadata.

Example implementation can be found in `/src/app/projects/[slug]/page.tsx`.

## Redis Caching Integration

Redis caching is implemented as a service in `/src/services/redis.ts`. The integration:

1. Connects to Redis using configuration from environment variables
2. Provides utility functions for caching, retrieving, and invalidating data
3. Includes a test function to verify Redis connectivity

### Using Redis in Components or API Routes

```typescript
import { cacheData, getCachedData } from '@/services/redis';

// Caching data
await cacheData('key', data, 3600); // Cache for 1 hour

// Retrieving cached data
const data = await getCachedData<YourDataType>('key');
if (data) {
  // Use cached data
} else {
  // Fetch fresh data
}
```

## Docker Compose Changes

The following changes were made to the existing Docker Compose file:

1. Added a frontend service:
   ```yaml
   frontend:
     build:
       context: ./frontend
       dockerfile: Dockerfile
     volumes:
       - ./frontend:/app
       - /app/node_modules
       - /app/.next
     ports:
       - '3000:3000'
     environment:
       - NODE_ENV=${NODE_ENV:-development}
       - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:1337}
   ```

2. Added a Redis service:
   ```yaml
   redis:
     image: redis:alpine
     ports:
       - '6379:6379'
     volumes:
       - redis_data:/data
   ```

3. Added volume definitions:
   ```yaml
   volumes:
     redis_data:
   ```

These changes maintain backward compatibility with the existing setup.

## Development Decisions

1. **Tailwind CSS**: Chosen for rapid UI development and responsive design
2. **App Router**: Used for better organization and built-in support for layouts and loading states
3. **Redis Integration**: Implemented as a service for clean separation of concerns
4. **TypeScript**: Used throughout for type safety and better developer experience
5. **Component Structure**: Organized by feature and function for scalability

## Manual Steps

While most setup is automated, you'll need to manually:

1. Set up environment variables by copying `.env.example` to `.env.local` or `.env`
2. Ensure Redis is running if using Redis features outside of Docker Compose
3. For production deployment, update the `next.config.ts` with any required configuration

## Troubleshooting

### Redis Connection Issues

If you encounter Redis connection issues:

1. Verify Redis is running: `docker compose ps`
2. Check Redis logs: `docker compose logs redis`
3. Ensure environment variables are correctly set
4. Try the Redis test function: 
   ```typescript
   import { testRedisConnection } from '@/services/redis';
   const result = await testRedisConnection();
   console.log(result);
   ```

### Build Errors

If you encounter build errors:

1. Clear the Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Verify TypeScript types: `npm run type-check`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
