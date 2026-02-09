"use client";
import { getLoginUserData } from "@/utils/selector";
import {
  Circle,
  Database,
  File,
  MessageCircleQuestion,
  User2,
  ChevronDown,
  ChevronRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const isLogin = useSelector(getLoginUserData);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLogin?.token) {
      router.push("/my-admin/login");
    }
  }, [isLogin]);

  const userPermissions = isLogin?.permissions || null;

  const menuData = [
    {
      label: "Dashboard",
      icon: Database,
      href: "/my-admin/dashboard",
      requiredPermissions: ["view_dashboard", "view_sdr"],
    },
    {
      label: "Bandobasts",
      icon: Shield,
      requiredPermissions: ["view_bandobast"],
      submenu: [
        {
          label: "All Bandobasts",
          icon: Circle,
          color: "blue-600",
          href: "/my-admin/bandobasts",
          requiredPermissions: ["view_bandobast"],
        },
        {
          label: "Create Bandobast",
          icon: Circle,
          color: "green-600",
          href: "/my-admin/bandobasts/add",
          requiredPermissions: ["create_bandobast"],
        },
      ],
    },
    {
      label: "Users",
      icon: User2,
      requiredPermissions: ["view_user"],
      submenu: [
        {
          label: "Users",
          icon: Circle,
          color: "blue-600",
          href: "/my-admin/users",
          requiredPermissions: ["view_user"],
        },
        {
          label: "Roles",
          icon: Circle,
          color: "red-600",
          href: "/my-admin/users/roles",
          requiredPermissions: ["view_role"],
        },
        {
          label: "Permissions",
          icon: Circle,
          color: "purple-600",
          href: "/my-admin/users/permissions",
          requiredPermissions: ["view_permission"],
        },
      ],
    },
    {
      label: "Faqs",
      icon: MessageCircleQuestion,
      href: "#",
      requiredPermissions: ["view_faq"],
    },
    {
      label: "About Us",
      icon: File,
      href: "#",
      requiredPermissions: ["view_about"],
    },
    {
      label: "Masters",
      icon: Database,
      requiredPermissions: ["view_master_data"],
      submenu: [
        {
          label: "Bandobast Types",
          icon: Circle,
          color: "blue-600",
          href: "/my-admin/masters/bandobast-types",
          requiredPermissions: ["view_master_data"],
        },
        {
          label: "Priority Levels",
          icon: Circle,
          color: "green-600",
          href: "/my-admin/masters/priority-levels",
          requiredPermissions: ["view_master_data"],
        },
        {
          label: "Threat Levels",
          icon: Circle,
          color: "blue-600",
          href: "/my-admin/masters/threat-levels",
          requiredPermissions: ["view_master_data"],
        },
        {
          label: "VIP Categories",
          icon: Circle,
          color: "purple-600",
          href: "/my-admin/masters/vip-categories",
          requiredPermissions: ["view_master_data"],
        },
        {
          label: "Approving Authorities",
          icon: Circle,
          color: "red-600",
          href: "/my-admin/masters/approving-authorities",
          requiredPermissions: ["view_master_data"],
        },
      ],
    },
    {
      label: "Settings",
      icon: Circle,
      color: "red-600",
      href: "/my-admin/settings",
      requiredPermissions: ["view_settings"],
    },
  ];

  const [openSubmenus, setOpenSubmenus] = useState({});

  // Function to check if the user has the required permissions
  const hasPermission = (requiredPermissions) => {
    if (!requiredPermissions) return true;
    return requiredPermissions.some((permission) =>
      userPermissions?.includes(permission)
    );
  };

  // Function to filter menu items based on permissions
  const filterMenuData = (menuData) => {
    return menuData.filter((item) => {
      if (item.submenu) {
        item.submenu = item.submenu.filter((subItem) =>
          hasPermission(subItem.requiredPermissions)
        );
        return (
          item.submenu.length > 0 || hasPermission(item.requiredPermissions)
        );
      }
      return hasPermission(item.requiredPermissions);
    });
  };

  const filteredMenuData = filterMenuData(menuData);

  // Function to toggle submenu open/close
  const toggleSubMenu = (index) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Check if current path matches menu item
  const isActive = (href) => {
    if (!href || href === "#") return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Check if submenu contains active item
  const hasActiveSubmenu = (submenu) => {
    if (!submenu) return false;
    return submenu.some((item) => isActive(item.href));
  };

  return (
    <div className="py-6 px-4 space-y-2">
      <nav className="space-y-1">
        {filteredMenuData.map((item, index) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isMenuActive =
            isActive(item.href) || hasActiveSubmenu(item.submenu);
          const isSubmenuOpen = openSubmenus[index];

          return (
            <div key={index}>
              {/* Main Menu Item */}
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubMenu(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isMenuActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {React.createElement(item.icon, {
                      className: `w-5 h-5 ${isMenuActive
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400"
                        }`,
                    })}
                    <span>{item.label}</span>
                  </div>
                  {isSubmenuOpen ? (
                    <ChevronDown
                      className={`w-4 h-4 ${isMenuActive ? "text-white" : "text-gray-500"
                        }`}
                    />
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 ${isMenuActive ? "text-white" : "text-gray-500"
                        }`}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isMenuActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                    }`}
                >
                  {React.createElement(item.icon, {
                    className: `w-5 h-5 ${isMenuActive
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400"
                      }`,
                  })}
                  <span>{item.label}</span>
                </Link>
              )}

              {/* Submenu */}
              {hasSubmenu && isSubmenuOpen && (
                <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  {item.submenu.map((subItem, subIndex) => {
                    const isSubActive = isActive(subItem.href);
                    return (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isSubActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-gray-800 dark:hover:text-gray-200"
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${isSubActive ? "bg-white" : `bg-${subItem.color}`
                            }`}
                        />
                        <span>{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
