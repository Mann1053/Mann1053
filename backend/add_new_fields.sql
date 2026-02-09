-- Add new fields to bandobasts table
ALTER TABLE bandobasts ADD COLUMN `location` VARCHAR(255) DEFAULT NULL;
ALTER TABLE bandobasts ADD COLUMN `village` VARCHAR(255) DEFAULT NULL;
ALTER TABLE bandobasts ADD COLUMN `landmark` VARCHAR(255) DEFAULT NULL;
ALTER TABLE bandobasts ADD COLUMN `vip_name` VARCHAR(255) DEFAULT NULL;
