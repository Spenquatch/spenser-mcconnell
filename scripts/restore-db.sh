#!/bin/bash

# Database Restore Script for SpenserMcConnell.com
# This script restores a PostgreSQL database backup to the Strapi database

# Check if backup file is provided
if [ -z "$1" ]; then
  echo "Error: No backup file specified"
  echo "Usage: ./restore-db.sh <backup-file>"
  echo "Example: ./restore-db.sh ./backups/spenser_db_20250518_120000.sql.gz"
  exit 1
fi

BACKUP_FILE=$1

# Load environment variables
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Check if the backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found: $BACKUP_FILE"
  exit 1
fi

echo "⚠️  WARNING: This will overwrite the current database!"
echo "Database: ${POSTGRES_DB}"
echo "Backup file: ${BACKUP_FILE}"
read -p "Are you sure you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Restore cancelled."
  exit 0
fi

echo "Preparing to restore database..."

# Handle compressed files
if [[ "$BACKUP_FILE" == *.gz ]]; then
  echo "Decompressing backup file..."
  TEMP_FILE="/tmp/spenser_db_restore_temp.sql"
  gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
  BACKUP_FILE="$TEMP_FILE"
fi

# Stop Strapi container to prevent connections during restore
echo "Stopping Strapi container..."
docker compose stop strapi

# Restore the database
echo "Restoring database from backup..."
cat "$BACKUP_FILE" | docker compose exec -T postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

# Check if restore was successful
if [ $? -eq 0 ]; then
  echo "✅ Database restored successfully!"
else
  echo "❌ Database restore failed"
  echo "Starting Strapi container..."
  docker compose start strapi
  exit 1
fi

# Clean up temp file if it was created
if [[ "$TEMP_FILE" == "/tmp/spenser_db_restore_temp.sql" ]]; then
  rm "$TEMP_FILE"
fi

# Start Strapi container
echo "Starting Strapi container..."
docker compose start strapi

echo "Done! Strapi is now running with the restored database."
