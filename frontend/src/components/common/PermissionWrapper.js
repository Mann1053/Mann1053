"use client";
import usePermissions from "@/hooks/usePermissions";

export default function PermissionWrapper({ permission, children, fallback = null }) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    return fallback;
  }
  
  return children;
}