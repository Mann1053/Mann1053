"use client";
import MasterDataForm from "./MasterDataForm";

export default function VipCategoryForm({ id = null }) {
    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Enter VIP category name",
        },
        {
            name: "security_level",
            label: "Security Level",
            type: "number",
            required: false,
            placeholder: "Enter security level (optional)",
            hint: "Higher number indicates higher security level",
        },
    ];

    return (
        <MasterDataForm
            id={id}
            endpoint="vip-categories"
            title="VIP Category"
            basePath="/my-admin/masters/vip-categories"
            fields={fields}
        />
    );
}
