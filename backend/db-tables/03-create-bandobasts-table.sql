-- Main Bandobast Table Migration
-- Execute this SQL manually in your database console AFTER creating master tables

CREATE TABLE IF NOT EXISTS bandobasts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Basic Details
  bandobast_name VARCHAR(255) NOT NULL,
  bandobast_type_id INT NOT NULL,
  priority_id INT NOT NULL,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE NOT NULL,
  end_time TIME NOT NULL,
  event_description TEXT,
  
  -- Location Information (using existing tables)
  state_id MEDIUMINT UNSIGNED,
  city_id MEDIUMINT UNSIGNED,  -- Matches cities.id
  police_range VARCHAR(100),
  division VARCHAR(100),
  control_room_location VARCHAR(255),
  
  -- Structure
  total_areas INT DEFAULT 0,
  
  -- Manpower Planning
  total_force INT DEFAULT 0,
  pi_count INT DEFAULT 0,
  psi_count INT DEFAULT 0,
  constable_count INT DEFAULT 0,
  home_guard_count INT DEFAULT 0,
  woman_police_count INT DEFAULT 0,
  srp_required BOOLEAN DEFAULT FALSE,
  special_force_required BOOLEAN DEFAULT FALSE,
  traffic_police_required BOOLEAN DEFAULT FALSE,
  shift_type ENUM('Single', 'Double', 'Triple') DEFAULT 'Single',
  
  -- Officer Assignment
  assignment_mode ENUM('Auto', 'Manual', 'Hybrid') DEFAULT 'Manual',
  reporting_officer VARCHAR(100),
  backup_officer VARCHAR(100),
  replacement_allowed BOOLEAN DEFAULT TRUE,
  
  -- Duty Instructions
  general_instructions TEXT,
  pointwise_instructions TEXT,
  emergency_protocol TEXT,
  uniform_type ENUM('Regular', 'Ceremonial', 'Riot Gear') DEFAULT 'Regular',
  
  -- Communication & Notifications
  group_chat_enabled BOOLEAN DEFAULT FALSE,
  emergency_broadcast BOOLEAN DEFAULT FALSE,
  language ENUM('Gujarati', 'English', 'Both') DEFAULT 'Gujarati',
  
  -- Monitoring & Tracking
  live_location_tracking BOOLEAN DEFAULT FALSE,
  location_update_interval ENUM('30sec', '1min', '5min') DEFAULT '1min',
  attendance_mode ENUM('Auto GPS', 'Manual') DEFAULT 'Manual',
  geo_fencing_enabled BOOLEAN DEFAULT FALSE,
  
  -- Approval & Authority
  approving_authority_id INT NOT NULL,
  remarks TEXT,
  approval_status ENUM('Draft', 'Pending', 'Approved', 'Rejected') DEFAULT 'Draft',
  approval_date DATETIME NULL,
  
  -- Post-Bandobast Settings
  auto_report_generation BOOLEAN DEFAULT FALSE,
  incident_logging BOOLEAN DEFAULT FALSE,
  photo_video_upload BOOLEAN DEFAULT FALSE,
  feedback_required BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_by INT NOT NULL,  -- Matches users.id
  status ENUM('Active', 'Inactive', 'Completed', 'Cancelled') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign Keys
  FOREIGN KEY (bandobast_type_id) REFERENCES bandobast_types(id),
  FOREIGN KEY (priority_id) REFERENCES priority_levels(id),
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (city_id) REFERENCES cities(id),
  FOREIGN KEY (approving_authority_id) REFERENCES approving_authorities(id),
  FOREIGN KEY (created_by) REFERENCES users(id) -- Ensure users.id matches created_by type (INT)
);

-- Bandobast Staff Junction Table
CREATE TABLE IF NOT EXISTS bandobast_staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  bandobast_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(15),
  buckle_number VARCHAR(50),
  designation VARCHAR(100),
  duty_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (bandobast_id) REFERENCES bandobasts(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_bandobasts_type ON bandobasts(bandobast_type_id);
CREATE INDEX idx_bandobasts_priority ON bandobasts(priority_id);
CREATE INDEX idx_bandobasts_state ON bandobasts(state_id);

CREATE INDEX idx_bandobasts_authority ON bandobasts(approving_authority_id);
CREATE INDEX idx_bandobasts_status ON bandobasts(status);
CREATE INDEX idx_bandobasts_approval_status ON bandobasts(approval_status);
CREATE INDEX idx_bandobasts_created_by ON bandobasts(created_by);
CREATE INDEX idx_bandobasts_dates ON bandobasts(start_date, end_date);
CREATE INDEX idx_bandobast_staff_bandobast ON bandobast_staff(bandobast_id);
