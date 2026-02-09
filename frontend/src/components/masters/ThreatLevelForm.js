"use client";
import MasterDataForm from "./MasterDataForm";

export default function ThreatLevelForm({ id = null }) {
    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Enter threat level name",
        },
        {
            name: "level",
            label: "Level",
            type: "number",
            required: true,
            placeholder: "Enter threat level (e.g., 1, 2, 3)",
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
            placeholder: "Enter description",
            rows: 4,
        },
    ];

    return (
        <MasterDataForm
            id={id}
            endpoint="threat-levels"
            title="Threat Level"
            basePath="/my-admin/masters/threat-levels"
            fields={fields}
        />
    );
}
