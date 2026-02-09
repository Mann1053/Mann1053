import UserProfile from "@/components/profile/UserProfile";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function ProfilePage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Profile", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <UserProfile />
      </div>
    </div>
  );
}