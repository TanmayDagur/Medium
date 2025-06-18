-- Set default name for existing users with null or empty name
UPDATE "User" SET name = 'Anonymous' WHERE name IS NULL OR name = '';
