"use client";
import MasterDataForm from "./MasterDataForm";

export default function ApprovingAuthorityForm({ id = null }) {
    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Enter authority name",
        },
        {
            name: "designation",
            label: "Designation",
            type: "text",
            required: true,
            placeholder: "Enter designation",
            hint: "Must be unique",
        },
        {
            name: "rank",
            label: "Rank",
            type: "number",
            required: false,
            placeholder: "Enter rank (optional)",
            hint: "Lower number indicates higher rank",
        },
    ];

    return (
        <MasterDataForm
            id={id}
            endpoint="approving-authorities"
            title="Approving Authority"
            basePath="/my-admin/masters/approving-authorities"
            fields={fields}
        />
    );
}
