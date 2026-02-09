import React from "react";
import ThreatLevelForm from "@/components/masters/ThreatLevelForm";

export default function page({ params }) {
    return <ThreatLevelForm id={params.id} />;
}
