// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../contexts/AuthContext";

// interface SignOutButtonProps {
//   className?: string;
//   children?: React.ReactNode;
// }

// export default function SignOutButton({
//   className = "",
//   children,
// }: SignOutButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { logout } = useAuth();

//   const handleSignOut = async () => {
//     setIsLoading(true);

//     try {
//       console.log("🚪 SignOutButton: Starting logout...");
//       await logout();
//       console.log("✅ SignOutButton: Logout completed");
//       // Redirect to home page after successful logout
//       router.push("/");
//     } catch (error) {
//       console.error("❌ SignOutButton: Logout error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleSignOut}
//       disabled={isLoading}
//       className={`inline-flex inter-tight-regular items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
//     >
//       {isLoading ? (
//         <div className="flex items-center">
//           <svg
//             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           Signing out...
//         </div>
//       ) : (
//         children || (
//           <div className="flex items-center">
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//             Sign Out
//           </div>
//         )
//       )}
//     </button>
//   );
// }
