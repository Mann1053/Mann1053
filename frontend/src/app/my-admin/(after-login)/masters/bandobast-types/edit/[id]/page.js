import React from "react";
import BandobastTypeForm from "@/components/masters/BandobastTypeForm";

export default function page({ params }) {
    return <BandobastTypeForm id={params.id} />;
}
