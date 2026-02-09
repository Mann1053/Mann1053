"use client";
import React from "react";
import EditUser from "@/components/users/EditUser";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const { user_id } = params;
  return <EditUser userId={user_id} />;
}
