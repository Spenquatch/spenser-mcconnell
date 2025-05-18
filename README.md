# SpenserMcConnell.com

A personal brand hub featuring a project portfolio, public updates timeline, AI A Day (AAAD) interactive newsletter & tool search, press/booking, and free resources.

## Overview

SpenserMcConnell.com is a comprehensive personal brand platform built with Next.js 14 for the frontend and Strapi as the headless CMS backend. The site features a modern, responsive design with several key components:

- **Project Portfolio**: Showcase of projects with detailed pages and GitHub integration
- **Updates Timeline**: Micro-blog and project changelog with filtering capabilities
- **An AI A Day (AAAD)**: Daily AI tool spotlight with search functionality powered by LLM
- **Press Kit & Booking**: Media assets, bio, quotes, and speaking/consulting inquiry system
- **Resources**: Free lead-magnets with optional email gating

## Repository Structure

```
spenser_project/
├── .github/          # GitHub-specific files (Actions workflows, templates)
├── backend/          # Strapi CMS and API implementation
├── config/           # Configuration files for various environments
├── docs/             # Project documentation
├── frontend/         # Next.js 14 application
├── scripts/          # Utility scripts for development and deployment
├── src/              # Shared source code
└── tests/            # Testing infrastructure and test files
```

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, SWR
- **Backend**: Strapi (headless CMS), Node.js
- **Database**: PostgreSQL 15 with pgvector extension
- **Vector Database**: Qdrant Cloud (Serverless)
- **Caching**: Redis (Upstash)
- **Email**: SendGrid
- **Deployment**: Cloudflare Pages (Frontend), Docker on Fly.io/Azure (Backend)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spenser-mcconnell.git
   cd spenser-mcconnell
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy example environment files
   cp frontend/.env.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

4. Start the development environment:
   ```bash
   # Start backend (Strapi + PostgreSQL)
   cd backend
   docker-compose up -d
   npm run develop
   
   # In a separate terminal, start frontend
   cd frontend
   npm run dev
   ```

5. Access the applications:
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

## Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following the coding standards

3. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. Push your branch and create a pull request:
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. After review and approval, merge your PR into `main`

## Deployment

The application uses a CI/CD pipeline with GitHub Actions:

1. Pushing to `main` triggers the staging deployment
2. Creating a release tag triggers the production deployment
3. Pull requests trigger build and test workflows

See the [Deployment Documentation](docs/deployment.md) for more details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).
