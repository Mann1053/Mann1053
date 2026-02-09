-- Points Management Migration
-- Execute this SQL manually in your database console

-- Step 1: Add total_points column to bandobasts table
ALTER TABLE bandobasts 
ADD COLUMN total_points INT DEFAULT 0 AFTER total_areas;

-- Step 2: Create bandobast_points table
CREATE TABLE IF NOT EXISTS bandobast_points (
  id INT PRIMARY KEY AUTO_INCREMENT,
  bandobast_id INT NOT NULL,
  point_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NULL,
  longitude DECIMAL(11, 8) NULL,
  officers_required INT DEFAULT 0,
  point_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (bandobast_id) REFERENCES bandobasts(id) ON DELETE CASCADE,
  INDEX idx_bandobast_points_bandobast (bandobast_id)
);

-- Step 3: Create bandobast_point_officers table
CREATE TABLE IF NOT EXISTS bandobast_point_officers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  point_id INT NOT NULL,
  bandobast_id INT NOT NULL,
  staff_id INT NULL,
  name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(15),
  buckle_number VARCHAR(50),
  designation VARCHAR(100),
  duty_location VARCHAR(255),
  officer_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (point_id) REFERENCES bandobast_points(id) ON DELETE CASCADE,
  FOREIGN KEY (bandobast_id) REFERENCES bandobasts(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES bandobast_staff(id) ON DELETE SET NULL,
  INDEX idx_point_officers_point (point_id),
  INDEX idx_point_officers_bandobast (bandobast_id)
);
