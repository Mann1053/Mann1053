import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
      <h6 className="font-semibold mb-0 dark:text-white">
        {items.length > 0 ? items[items.length - 1].label : "Page"}
      </h6>
      <ul className="flex items-center gap-2">
        <li className="font-medium">
          <Link
            href="/my-admin/dashboard"
            className="flex items-center gap-2 hover:text-primary-600 dark:text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="dark:text-white">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-medium dark:text-white">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
