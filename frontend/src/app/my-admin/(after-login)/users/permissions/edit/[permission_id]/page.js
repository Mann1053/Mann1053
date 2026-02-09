import EditPermission from "@/components/permissions/EditPermission";

export default function EditPermissionPage({ params }) {
  return (
    <>
      <div className="card-header">
        <h6 className="card-title mb-0 text-lg">Edit Permission</h6>
      </div>
      <EditPermission permissionId={params.permission_id} />
    </>
  );
}