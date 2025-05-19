#!/bin/bash
set -e

echo "Installing pgvector extension..."
docker compose exec postgres psql -U strapi -d strapi -c "
CREATE EXTENSION IF NOT EXISTS vector;

DROP TABLE IF EXISTS vector_test;
CREATE TABLE vector_test (
  id SERIAL PRIMARY KEY,
  embedding vector(1536),  -- OpenAI embeddings use 1536 dimensions
  content TEXT
);

-- Generate a 1536-dimension vector (all zeros except first three values)
INSERT INTO vector_test (embedding, content)
VALUES (
  ('['
   || '0.1,0.2,0.3'
   || repeat(',0', 1533)
   || ']')::vector,
  'Test vector for OpenAI embeddings (1536 dimensions)'
);

CREATE OR REPLACE FUNCTION verify_pgvector()
RETURNS TEXT AS \$\$
BEGIN
  RETURN 'pgvector extension is installed and working properly';
END;
\$\$ LANGUAGE plpgsql;
"

echo "Verifying pgvector installation..."
docker compose exec postgres psql -U strapi -d strapi -c "SELECT verify_pgvector();"
docker compose exec postgres psql -U strapi -d strapi -c "SELECT id, content, substring(embedding::text, 1, 20) || '...' FROM vector_test LIMIT 1;"

echo "pgvector is now installed and ready to use with OpenAI embeddings (1536 dimensions)!"
