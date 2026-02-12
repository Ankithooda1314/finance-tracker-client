// import Layout from "../components/Layout";
// import { getUser, logout } from "../services/auth";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const navigate = useNavigate();
//   const user = getUser();

//   return (
//     <Layout>
//       <div className="bg-gray-800 p-6 rounded-xl space-y-3">
//         <h1 className="text-2xl font-bold">
//           Profile
//         </h1>

//         <p>Name: {user}</p>
//         <p>Status: Active user</p>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="bg-red-600 px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </Layout>
//   );
// }


import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../services/api";
import { getUser, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/transactions");
      setData(res.data);
    };
    fetch();
  }, []);

  const income = data
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = data
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  const topCategory =
    data
      .filter((tx) => tx.type === "expense")
      .reduce((acc: any, tx: any) => {
        acc[tx.category] =
          (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

  const bestCategory =
    Object.entries(topCategory).sort(
      (a: any, b: any) => b[1] - a[1]
    )[0]?.[0] || "None";

  const card = (
    title: string,
    value: string | number,
    color: string
  ) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow">
      <p className="text-gray-400 text-sm">
        {title}
      </p>
      <h2 className={`text-2xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Profile
          </h1>
          <p className="text-gray-400">
            Welcome back, {user}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {card("Total Income", `₹${income}`, "text-green-400")}
          {card("Total Expense", `₹${expense}`, "text-red-400")}
          {card("Balance", `₹${balance}`, "text-blue-400")}
        </div>

        {/* Insights */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl space-y-2">
          <h2 className="font-bold text-lg">
            Insights
          </h2>

          <p className="text-gray-300">
            Top spending category:
            <span className="text-yellow-400 font-semibold">
              {" "}
              {bestCategory}
            </span>
          </p>

          <p className="text-gray-400 text-sm">
            Track spending to improve savings 📈
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>
    </Layout>
  );
}
