import React from "react";
import ApprovingAuthorityForm from "@/components/masters/ApprovingAuthorityForm";

export default function page({ params }) {
    return <ApprovingAuthorityForm id={params.id} />;
}
