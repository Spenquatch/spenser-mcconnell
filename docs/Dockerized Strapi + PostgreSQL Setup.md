# Dockerized Strapi + PostgreSQL Setup - Clean Rebuild Instructions

## Clean Rebuild Steps

1. Stop and remove all containers:
   ```bash
   docker compose down -v
   ```

2. Remove all related images:
   ```bash
   docker rmi $(docker images -q 'strapi-*')
   ```

3. Clean Docker system (optional):
   ```bash
   docker system prune -f
   ```

4. Rebuild and start fresh:
   ```bash
   docker compose build --no-cache
   docker compose up -d
   ```

5. Verify containers are running:
   ```bash
   docker compose ps
   ```

6. Check container logs:
   ```bash
   docker compose logs -f
   ```

7. Verify Strapi is accessible:
   - Admin panel: http://localhost:1337/admin
   - API: http://localhost:1337

## Automation Script
Create a `rebuild.sh` script:
```bash
#!/bin/bash

echo "Stopping and removing containers..."
docker compose down -v

echo "Removing old images..."
docker rmi $(docker images -q 'strapi-*')

echo "Cleaning Docker system..."
docker system prune -f

echo "Rebuilding containers..."
docker compose build --no-cache

echo "Starting services..."
docker compose up -d

echo "Waiting for services to start..."
sleep 10

echo "Checking container status..."
docker compose ps

echo "Rebuild complete! Check http://localhost:1337/admin"
```

Make the script executable:
```bash
chmod +x rebuild.sh
```

Run the rebuild:
```bash
./rebuild.sh
```

```# Dockerized Strapi + PostgreSQL Setup

This document provides comprehensive instructions for setting up and running the Dockerized Strapi and PostgreSQL environment for SpenserMcConnell.com.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0.0 or higher)
- Git

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Spenquatch/spenser-mcconnell.git
   cd spenser-mcconnell
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Start the containers:
   ```bash
   docker compose up -d
   ```

4. Access Strapi at [http://localhost:1337/admin](http://localhost:1337/admin)

## Detailed Setup Instructions

### Environment Configuration

1. Copy the example environment file to create your own:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to customize your settings:
   ```bash
   # For security in production, change these values:
   POSTGRES_USER=strapi
   POSTGRES_PASSWORD=strapipassword
   POSTGRES_DB=strapi
   
   # Generate random values for these secrets:
   APP_KEYS=random1,random2,random3,random4
   API_TOKEN_SALT=randomAPITokenSalt
   ADMIN_JWT_SECRET=randomAdminJWTSecret
   JWT_SECRET=randomJWTSecret
   ```

   For production, you should generate random values for the security keys. You can use this command to generate random strings:
   ```bash
   openssl rand -base64 32
   ```

### Starting the Application

1. Start both Strapi and PostgreSQL containers:
   ```bash
   docker compose up -d
   ```

2. Check if the containers are running:
   ```bash
   docker compose ps
   ```

3. View logs to ensure everything started correctly:
   ```bash
   docker compose logs -f
   ```

4. Access the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)

5. On first run, create an admin user when prompted.

### Stopping the Application

To stop the containers without removing them:
```bash
docker compose stop
```

To stop and remove the containers (data will be preserved in volumes):
```bash
docker compose down
```

To completely remove everything including volumes (WARNING: this will delete all data):
```bash
docker compose down -v
```

## Database Management

### Creating Backups

The repository includes a script to easily create database backups:

```bash
./scripts/backup-db.sh
```

This will:
1. Create a timestamped SQL backup in the `./backups` directory
2. Compress the backup with gzip
3. Display the backup location and size

### Restoring from Backups

To restore a database from a backup:

```bash
./scripts/restore-db.sh ./backups/spenser_db_20250518_120000.sql.gz
```

This will:
1. Stop the Strapi container to prevent connections during restore
2. Restore the database from the specified backup file
3. Restart the Strapi container

**WARNING**: This will overwrite the current database. The script will ask for confirmation before proceeding.

## PostgreSQL with pgvector

The PostgreSQL container comes pre-configured with the pgvector extension for vector similarity search capabilities.

### Verifying pgvector Installation

To verify that pgvector is installed and working:

1. Connect to the PostgreSQL container:
   ```bash
   docker compose exec postgres psql -U strapi -d strapi
   ```

2. Run the verification function:
   ```sql
   SELECT verify_pgvector();
   ```

3. You should see: `pgvector extension is installed and working properly`

4. You can also check the test table:
   ```sql
   SELECT * FROM vector_test;
   ```

### Using pgvector in Strapi

To use pgvector with Strapi, you'll need to:

1. Install a PostgreSQL client in your Strapi application
2. Use raw database queries to interact with vector data

Example in a Strapi service:
```javascript
module.exports = {
  async storeEmbedding(content, embedding) {
    const knex = strapi.db.connection;
    
    await knex.raw(
      'INSERT INTO vector_test (content, embedding) VALUES (?, ?::vector)',
      [content, JSON.stringify(embedding)]
    );
  },
  
  async findSimilar(embedding, limit = 5) {
    const knex = strapi.db.connection;
    
    const results = await knex.raw(
      'SELECT content, embedding <-> ?::vector AS distance FROM vector_test ORDER BY distance LIMIT ?',
      [JSON.stringify(embedding), limit]
    );
    
    return results.rows;
  }
};
```

## Troubleshooting

### Container Won't Start

If containers fail to start:

1. Check logs for errors:
   ```bash
   docker compose logs
   ```

2. Verify your `.env` file exists and has the correct values

3. Ensure ports 1337 and 5432 are not already in use:
   ```bash
   sudo lsof -i :1337
   sudo lsof -i :5432
   ```

### Database Connection Issues

If Strapi can't connect to PostgreSQL:

1. Ensure PostgreSQL container is running:
   ```bash
   docker compose ps postgres
   ```

2. Check PostgreSQL logs:
   ```bash
   docker compose logs postgres
   ```

3. Verify database credentials in `.env` match what's in the Strapi configuration

### Rebuilding Containers

If you need to rebuild the containers:

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Accessing PostgreSQL Directly

To connect to the PostgreSQL database directly:

```bash
docker compose exec postgres psql -U strapi -d strapi
```

## Maintenance

### Updating Strapi

To update Strapi:

1. Update the version in the Dockerfile
2. Rebuild the container:
   ```bash
   docker compose build strapi
   docker compose up -d strapi
   ```

### Backing Up Volumes

To back up the Docker volumes:

1. Stop the containers:
   ```bash
   docker compose down
   ```

2. Back up the volumes:
   ```bash
   docker run --rm -v spenser_mcconnell_postgres_data:/source -v $(pwd)/volume-backups:/backup alpine tar -czf /backup/postgres_data_$(date +%Y%m%d).tar.gz -C /source .
   ```

## Additional Information

### Container Details

- **Strapi**: Runs on port 1337, with source code mounted from `./backend/strapi`
- **PostgreSQL**: Runs on port 5432, with data stored in a Docker volume

### Directory Structure

```
spenser-mcconnell/
├── .env.example          # Example environment variables
├── .env                  # Your environment variables (create from example)
├── docker-compose.yml    # Docker Compose configuration
├── backend/
│   ├── strapi/           # Strapi application code
│   │   └── Dockerfile    # Strapi Docker configuration
│   └── postgres/
│       └── init/         # PostgreSQL initialization scripts
├── scripts/
│   ├── backup-db.sh      # Database backup script
│   └── restore-db.sh     # Database restore script
└── backups/              # Database backups (created by backup script)
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| POSTGRES_USER | PostgreSQL username | strapi |
| POSTGRES_PASSWORD | PostgreSQL password | strapipassword |
| POSTGRES_DB | PostgreSQL database name | strapi |
| NODE_ENV | Node.js environment | development |
| APP_KEYS | Strapi app keys | (random values) |
| API_TOKEN_SALT | Strapi API token salt | (random value) |
| ADMIN_JWT_SECRET | Strapi admin JWT secret | (random value) |
| JWT_SECRET | Strapi JWT secret | (random value) |

## Support

For issues or questions, please open an issue on the GitHub repository.
