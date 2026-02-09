import React from "react";
import PriorityLevelForm from "@/components/masters/PriorityLevelForm";

export default function page({ params }) {
    return <PriorityLevelForm id={params.id} />;
}
