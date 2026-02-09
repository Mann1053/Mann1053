"use client";
import MasterDataList from "./MasterDataList";

export default function VipCategoriesList() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "security_level", label: "Security Level" },
    ];

    return (
        <MasterDataList
            endpoint="vip-categories"
            title="VIP Categories"
            basePath="/my-admin/masters/vip-categories"
            columns={columns}
        />
    );
}
