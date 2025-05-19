#!/bin/bash

# Database Backup Script for SpenserMcConnell.com
# This script creates a backup of the PostgreSQL database used by Strapi

# Load environment variables
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Set variables
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
BACKUP_FILE="${BACKUP_DIR}/spenser_db_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

echo "Creating database backup..."

# Run pg_dump inside the PostgreSQL container
docker compose exec -T postgres pg_dump -U ${POSTGRES_USER} -d ${POSTGRES_DB} > ${BACKUP_FILE}

# Check if backup was successful
if [ $? -eq 0 ]; then
  echo "✅ Backup created successfully: ${BACKUP_FILE}"
  echo "Backup size: $(du -h ${BACKUP_FILE} | cut -f1)"
else
  echo "❌ Backup failed"
  exit 1
fi

# Create compressed version
gzip -f ${BACKUP_FILE}
echo "✅ Compressed backup created: ${BACKUP_FILE}.gz"

echo "Done!"
