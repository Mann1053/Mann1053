"use client";
import MasterDataList from "./MasterDataList";

export default function ThreatLevelsList() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "level", label: "Level" },
        { key: "description", label: "Description" },
    ];

    return (
        <MasterDataList
            endpoint="threat-levels"
            title="Threat Levels"
            basePath="/my-admin/masters/threat-levels"
            columns={columns}
        />
    );
}
