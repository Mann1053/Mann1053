"use client";
import MasterDataForm from "./MasterDataForm";

export default function PriorityLevelForm({ id = null }) {
    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Enter priority level name",
        },
        {
            name: "level",
            label: "Level",
            type: "number",
            required: true,
            placeholder: "Enter priority level (e.g., 1, 2, 3)",
        },
        {
            name: "color",
            label: "Color",
            type: "color",
            required: false,
            placeholder: "#000000",
            hint: "Select a color for visual representation",
        },
    ];

    return (
        <MasterDataForm
            id={id}
            endpoint="priority-levels"
            title="Priority Level"
            basePath="/my-admin/masters/priority-levels"
            fields={fields}
        />
    );
}
