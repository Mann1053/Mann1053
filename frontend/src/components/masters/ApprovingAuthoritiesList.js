"use client";
import MasterDataList from "./MasterDataList";

export default function ApprovingAuthoritiesList() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "rank", label: "Rank" },
    ];

    return (
        <MasterDataList
            endpoint="approving-authorities"
            title="Approving Authorities"
            basePath="/my-admin/masters/approving-authorities"
            columns={columns}
        />
    );
}
