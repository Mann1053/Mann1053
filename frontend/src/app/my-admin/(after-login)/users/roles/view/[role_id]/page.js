"use client";
import React from "react";
import ViewRole from "@/components/roles/ViewRole";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const { role_id } = params;
  return <ViewRole roleId={role_id} />;
}
