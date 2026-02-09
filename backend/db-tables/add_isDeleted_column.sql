-- Add isDeleted column to users table
-- This column will have default value 0 and only accept 0 or 1
-- Run this SQL command on your database to add the column

ALTER TABLE users 
ADD COLUMN isDeleted TINYINT(1) NOT NULL DEFAULT 0 
CHECK (isDeleted IN (0, 1));