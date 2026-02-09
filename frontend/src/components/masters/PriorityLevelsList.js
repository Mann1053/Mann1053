"use client";
import MasterDataList from "./MasterDataList";

export default function PriorityLevelsList() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "level", label: "Level" },
        { key: "color", label: "Color" },
    ];

    const renderCell = (key, item) => {
        if (key === "color" && item.color) {
            return (
                <div className="flex items-center gap-2">
                    <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.color}</span>
                </div>
            );
        }
        return item[key] || "N/A";
    };

    return (
        <MasterDataList
            endpoint="priority-levels"
            title="Priority Levels"
            basePath="/my-admin/masters/priority-levels"
            columns={columns}
            renderCell={renderCell}
        />
    );
}
