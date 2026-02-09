import AddUser from "@/components/users/AddUser";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="col-span-12">
      <div className="card border-0">
        <div className="card-header items-center flex justify-between">
          <h5 className="text-lg font-semibold mb-0">Add User</h5>
          <Link href="/my-admin/users">
            <ArrowLeft className="h-6 mr-2" />
          </Link>
        </div>
        <AddUser />
      </div>
    </div>
  );
}
