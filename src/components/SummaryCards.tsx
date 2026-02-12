// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// export default function SummaryCards({ month }: { month: string }) {
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await api.get("/transactions");

//       const filtered = res.data.filter(
//         (tx: any) => tx.month === month
//       );

//       const inc = filtered
//         .filter((tx: any) => tx.type === "income")
//         .reduce((sum: number, tx: any) => sum + tx.amount, 0);

//       const exp = filtered
//         .filter((tx: any) => tx.type === "expense")
//         .reduce((sum: number, tx: any) => sum + tx.amount, 0);

//       setIncome(inc);
//       setExpense(exp);
//     };

//     fetch();
//   }, [month]);

//   const balance = income - expense;

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <div className="bg-green-600 p-4 rounded-xl">
//         <p>{month} Income</p>
//         <h2 className="text-2xl font-bold">${income}</h2>
//       </div>

//       <div className="bg-red-600 p-4 rounded-xl">
//         <p>{month} Expense</p>
//         <h2 className="text-2xl font-bold">${expense}</h2>
//       </div>

//       <div className="bg-blue-600 p-4 rounded-xl">
//         <p>{month} Balance</p>
//         <h2 className="text-2xl font-bold">${balance}</h2>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function SummaryCards({ month }: any) {
  const [data, setData] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await api.get("/transactions");
  //     setData(res.data);
  //   };
  //   fetch();
  // }, []);

  useEffect(() => {
  const fetch = async () => {
    const res = await api.get("/transactions");
    setData(res.data);
  };

  fetch();

  window.addEventListener(
    "transactionsUpdated",
    fetch
  );

  return () =>
    window.removeEventListener(
      "transactionsUpdated",
      fetch
    );
}, []);


  const filtered = data.filter((tx) => tx.month === month);

  const income = filtered
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = filtered
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  const card = (title: string, value: number, color: string) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-md hover:scale-[1.02] transition-all">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        ${value}
      </h2>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {card("Income", income, "text-green-400")}
      {card("Expense", expense, "text-red-400")}
      {card("Balance", balance, "text-blue-400")}
    </div>
  );
}
