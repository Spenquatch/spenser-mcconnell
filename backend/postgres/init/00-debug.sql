-- This script helps debug initialization
CREATE TABLE IF NOT EXISTS init_debug (
  id SERIAL PRIMARY KEY,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO init_debug (message) VALUES ('Initialization scripts are running');