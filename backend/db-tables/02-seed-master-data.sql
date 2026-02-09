-- Seed Master Data for Bandobast Management
-- Execute this SQL manually in your database console
-- Note: States and Cities data already exists in your database

-- 1. Seed Bandobast Types
INSERT INTO bandobast_types (name, description) VALUES
('VIP Visit', 'Security arrangements for VIP visits'),
('VVIP', 'Security arrangements for VVIP visits'),
('Public Event', 'Security for public gatherings and events'),
('Festival', 'Security during festivals and celebrations'),
('Election Duty', 'Security arrangements during elections'),
('Law and Order', 'General law and order maintenance'),
('Riot Control', 'Riot and mob control operations'),
('Special Operation', 'Special security operations');

-- 2. Seed Priority Levels
INSERT INTO priority_levels (name, color, level) VALUES
('Low', '#4CAF50', 1),
('Medium', '#FFC107', 2),
('High', '#FF9800', 3),
('Critical', '#F44336', 4);

-- 3. Seed VIP Categories
INSERT INTO vip_categories (name, description) VALUES
('Z+ Security', 'Highest level of security with 36+ security personnel'),
('Z Security', 'High security with 22+ security personnel'),
('Y+ Security', 'Enhanced security with 11+ security personnel'),
('Y Security', 'Standard high security with 11 security personnel'),
('X Security', 'Basic security with 2-4 security personnel'),
('No Category', 'No specific security category assigned');

-- 4. Seed Threat Levels
INSERT INTO threat_levels (name, color, level) VALUES
('Low', '#4CAF50', 1),
('Moderate', '#FFC107', 2),
('High', '#FF9800', 3),
('Severe', '#F44336', 4);

-- 5. Seed Approving Authorities
INSERT INTO approving_authorities (designation, rank_order) VALUES
('SP (Superintendent of Police)', 1),
('DIG (Deputy Inspector General)', 2),
('IG (Inspector General)', 3),
('ADGP (Additional Director General of Police)', 4),
('DGP (Director General of Police)', 5),
('Chief Secretary', 6);
