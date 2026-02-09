import ViewUser from "@/components/users/ViewUser";
import Breadcrumb from "@/components/common/Breadcrumb";
import PermissionWrapper from "@/components/common/PermissionWrapper";

export default function ViewUserPage({ params }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Users", href: "/users" },
    { label: "View User", href: "#" },
  ];

  return (
    <PermissionWrapper permission="view_user">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumb items={breadcrumbItems} />
          <ViewUser userId={params.user_id} />
        </div>
      </div>
    </PermissionWrapper>
  );
}