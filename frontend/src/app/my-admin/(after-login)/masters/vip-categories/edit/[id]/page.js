import React from "react";
import VipCategoryForm from "@/components/masters/VipCategoryForm";

export default function page({ params }) {
    return <VipCategoryForm id={params.id} />;
}
