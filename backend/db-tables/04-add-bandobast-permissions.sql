-- Add Bandobast Permissions
-- Execute this SQL manually in your database console

-- Insert bandobast permissions
INSERT INTO permissions (name, description, created_at, updated_at) VALUES
('view_bandobast', 'View bandobast details and list', NOW(), NOW()),
('create_bandobast', 'Create new bandobast', NOW(), NOW()),
('update_bandobast', 'Update existing bandobast', NOW(), NOW()),
('delete_bandobast', 'Delete bandobast', NOW(), NOW()),
('approve_bandobast', 'Approve bandobast requests', NOW(), NOW());

-- Optional: Assign permissions to admin role (role_id = 1)
-- Get permission IDs first, then assign to role
INSERT INTO role_permissions (role_id, permission_id, created_at, updated_at)
SELECT 1, id, NOW(), NOW()
FROM permissions
WHERE name IN ('view_bandobast', 'create_bandobast', 'update_bandobast', 'delete_bandobast', 'approve_bandobast');
