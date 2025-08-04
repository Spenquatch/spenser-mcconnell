# DevSpace-Next to Strapi Migration Plan

## Overview
Migrate the `devspace-next` template to use Strapi as the content management system while keeping existing Strapi content types intact for the old frontend.

## Current State
- **Backend**: Dockerized Strapi v5.13.0 + PostgreSQL + Redis
- **Old Frontend**: Basic Next.js app connected to Strapi (keep as-is)
- **DevSpace-Next**: Modern template using MDX files for content

## Goal
Replace devspace-next's file-based content system with Strapi API integration.

## New Strapi Content Types Required

### 1. DevSpace Blog Posts (`devspace-blog-post`)
- `title` (Text, required)
- `publishedAt` (Date, required)  
- `updatedAt` (Date, optional)
- `image` (Media, optional)
- `summary` (Text, optional)
- `author` (Text, optional)
- `authorImg` (Media, optional)
- `content` (Rich Text, required)
- `slug` (UID, required, from title)

### 2. DevSpace Projects (`devspace-project`)
- `title` (Text, required)
- `description` (Text, required)
- `iconColor` (Text, hex color)
- `iconSvgPath` (Text, SVG path data)
- `link` (URL, required)
- `featured` (Boolean, default false)
- `order` (Number, for sorting)

### 3. DevSpace Talks (`devspace-talk`)
- `title` (Text, required)
- `image` (Media, required)
- `link` (URL, required)
- `featured` (Boolean, default false)
- `order` (Number, for sorting)

### 4. DevSpace Hero (`devspace-hero`)
- `profileImage` (Media, required)
- `title` (Rich Text, required)
- `description` (Text, required)
- `isActive` (Boolean, default true)

### 5. DevSpace Widgets (`devspace-widget`)
- `type` (Enumeration: newsletter, sponsor, book)
- `title` (Text, required)
- `description` (Text, optional)
- `data` (JSON, flexible widget data)
- `isActive` (Boolean, default true)
- `order` (Number, for sorting)

## Implementation Steps

### Phase 1: Strapi Content Types ✅ COMPLETED
- [x] Create Blog Posts content type
- [x] Create Projects content type  
- [x] Create Talks content type
- [x] Create Hero content type
- [x] Create Widgets content type
- [x] Configure API permissions for public access

### Phase 2: DevSpace-Next API Integration ✅ COMPLETED
- [x] Add environment variables for Strapi connection
- [x] Create Strapi API client (`lib/strapi.ts`)
- [x] Create TypeScript types (`types/strapi.ts`)
- [x] Update `components/mdx/utils.ts` to use API instead of files

### Phase 3: Component Updates 🚧 NEXT STEPS
- [ ] Update `app/page.tsx` to fetch from Strapi
- [ ] Update `app/posts/[slug]/page.tsx` for dynamic content
- [ ] Update `components/hero.tsx` to use Strapi data
- [ ] Update `components/featured-projects.tsx` to use API
- [ ] Update `components/talks.tsx` to use API
- [ ] Update sidebar widgets to use Strapi data

### Phase 4: Docker Configuration ✅ COMPLETED
- [x] Update `docker-compose.yml` to use devspace-next
- [x] Create Dockerfile for devspace-next
- [x] Configure environment variables

### Phase 5: Content Migration
- [ ] Import existing MDX blog posts to Strapi
- [ ] Add sample project data
- [ ] Add sample talk data
- [ ] Configure hero content
- [ ] Set up widget data

### Phase 6: Testing & Cleanup
- [ ] Test all pages and components
- [ ] Verify API responses
- [ ] Clean up unused MDX files
- [ ] Update documentation

## File Changes Required

### New Files
- `devspace-next/lib/strapi.ts` - API client
- `devspace-next/types/strapi.ts` - Type definitions
- `devspace-next/.env.local` - Environment variables

### Modified Files
- `docker-compose.yml` - Replace frontend service
- `devspace-next/components/mdx/utils.ts` - API integration
- `devspace-next/app/page.tsx` - Fetch from API
- `devspace-next/app/posts/[slug]/page.tsx` - Dynamic content
- `devspace-next/components/hero.tsx` - API data
- `devspace-next/components/featured-projects.tsx` - API data
- `devspace-next/components/talks.tsx` - API data
- `devspace-next/components/widget-*.tsx` - API data

## Environment Variables
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token
```

## Notes
- Keep existing Strapi content types intact
- Old frontend remains functional
- DevSpace-Next becomes the new primary frontend
- All content manageable through Strapi admin