"use client";
import { useSelector } from "react-redux";
import { getLoginUserData } from "@/utils/selector";

export default function usePermissions() {
  const userData = useSelector(getLoginUserData);
  
  const hasPermission = (permission) => {
    if (!userData?.permissions) return false;
    return userData.permissions.includes(permission);
  };

  return { hasPermission };
}