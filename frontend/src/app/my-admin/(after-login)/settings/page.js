import Settings from "@/components/settings/Settings";
// import PermissionWrapper from "@/components/common/PermissionWrapper";

export default function SettingsPage() {
  return (
   <Settings />
  );
}

 // <PermissionWrapper
    //   permission="view_settings"
    //   fallback={
    //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
    //       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center max-w-md">
    //         <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
    //           <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    //           </svg>
    //         </div>
    //         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h2>
    //         <p className="text-gray-600 dark:text-gray-400">You don't have permission to view the settings page.</p>
    //       </div>
    //     </div>
    //   }
    // >
     // <Settings />
    //</PermissionWrapper> 