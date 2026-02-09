"use client";
import React from "react";

import { useParams } from "next/navigation";

import EditRole from "@/components/roles/EditRole";

export default function page() {
  const params = useParams();
  const { role_id } = params;
  return <EditRole roleId={role_id} />;
}
