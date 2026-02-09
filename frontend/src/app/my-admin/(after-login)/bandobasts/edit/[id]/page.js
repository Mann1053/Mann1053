"use client";

import React from "react";
import EditBandobastForm from "@/components/bandobasts/EditBandobastForm";

export default function EditBandobastPage({ params }) {
    const { id } = React.use(params);
    return <EditBandobastForm bandobastId={id} />;
}
