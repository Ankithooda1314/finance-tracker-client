// import { Link } from "react-router-dom";

// export default function Layout({ children }: any) {
//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">

//       {/* Sidebar */}
//       <div className="w-60 bg-gray-800 p-6 space-y-4">
//         <h1 className="text-2xl font-bold">Finance</h1>

//         <nav className="space-y-2">
//           <Link to="/dashboard" className="block hover:text-green-400">
//             Dashboard
//           </Link>
//           <Link to="/transactions" className="block hover:text-green-400">
//             Transactions
//           </Link>
//           <Link to="/charts" className="block hover:text-green-400">
//             Charts
//           </Link>
//           <Link to="/profile" className="block hover:text-green-400">
//             Profile
//           </Link>
//         </nav>
//       </div>

//       {/* Page content */}
//       <div className="flex-1 p-6">{children}</div>
//     </div>
//   );
// }


import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: any) {
  const location = useLocation();

  const item = (path: string, label: string) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`block px-4 py-2 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-green-500/20 text-green-400"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* Sidebar */}
      <div className="w-64 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 shadow-xl">

        <h1 className="text-2xl font-bold mb-10 text-green-400 tracking-wide">
          Finance Pro
        </h1>

        <nav className="space-y-2 text-sm">
          {item("/dashboard", "Dashboard")}
          {item("/transactions", "Transactions")}
          {item("/charts", "Charts")}
          {item("/profile", "Profile")}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
