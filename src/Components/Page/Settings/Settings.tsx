// import { Link } from "react-router";

// import { UserRoundPen, Printer, ChevronRight } from "lucide-react";
// import Navbar from"../../Share/Navbar"
// export default function Settings() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* 1. The Sidebar/Navbar */}
// <Navbar/>

//       {/* 2. Main Content Area */}
//       {/* ml-64 shifts content to the right of the sidebar on desktop */}
//       {/* pb-20 prevents content from being hidden by the mobile bottom bar */}
//       <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24">
//         <div className="max-w-3xl mx-auto">
          
//           <header className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//             <p className="text-gray-500 text-sm">Configure your QuickBill experience</p>
//           </header>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <ul className="divide-y divide-gray-50">
              
//               {/* Profile Link */}
//               <li>
//                 <Link to="settings/profile" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
//                       <UserRoundPen size={20} />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">Profile</p>
//                       <p className="text-xs text-gray-500">Edit your business details and logo</p>
//                     </div>
//                   </div>
//                   <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-600" />
//                 </Link>
//               </li>

//               {/* Print Settings Link */}
//               <li>
//                 <Link to="/settings/printSettings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-all">
//                       <Printer size={20} />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">Print Settings</p>
//                       <p className="text-xs text-gray-500">Page size, margins, and thermal printer setup</p>
//                     </div>
//                   </div>
//                   <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-600" />
//                 </Link>
//               </li>

//             </ul>
//           </div>

//           <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
//             <p className="text-xs text-yellow-700 leading-relaxed">
//               <strong>Tip:</strong> Changes made to Print Settings will apply to all new invoices generated from this device.
//             </p>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }
// // Sub-component for clean list items
