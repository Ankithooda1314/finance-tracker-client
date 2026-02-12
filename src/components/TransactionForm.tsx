// import { useState } from "react";
// import { api } from "../services/api";

// export default function TransactionForm() {
//   const [type, setType] = useState<"income" | "expense">("income");
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [notes, setNotes] = useState("");
//   const [month, setMonth] = useState(
//     localStorage.getItem("month") || "January"
//   );

//   const add = async () => {
//     const finalTitle = type === "income" ? "Salary" : title;

//     await api.post("/transactions", {
//       title: finalTitle,
//       amount: Number(amount),
//       type,
//       category: type === "income" ? "Income" : category,
//       notes,
//       month,
//     });

//     window.location.reload();
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-xl space-y-3">
//       <h2 className="text-xl font-bold">Add Entry</h2>

//       <div className="flex gap-2">
//         <button
//           onClick={() => setType("income")}
//           className={`flex-1 p-2 rounded ${
//             type === "income" ? "bg-green-600" : "bg-gray-700"
//           }`}
//         >
//           Income
//         </button>

//         <button
//           onClick={() => setType("expense")}
//           className={`flex-1 p-2 rounded ${
//             type === "expense" ? "bg-red-600" : "bg-gray-700"
//           }`}
//         >
//           Expense
//         </button>
//       </div>

//       {type === "expense" && (
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 rounded bg-gray-700"
//         />
//       )}

//       <input
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="w-full p-2 rounded bg-gray-700"
//       />

//       {type === "expense" && (
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-2 rounded bg-gray-700"
//         />
//       )}

//       <select
//         value={month}
//         onChange={(e) => {
//           setMonth(e.target.value);
//           localStorage.setItem("month", e.target.value);
//         }}
//         className="w-full p-2 rounded bg-gray-700"
//       >
//         <option>January</option>
//         <option>February</option>
//         <option>March</option>
//         <option>April</option>
//         <option>May</option>
//         <option>June</option>
//         <option>July</option>
//         <option>August</option>
//         <option>September</option>
//         <option>October</option>
//         <option>November</option>
//         <option>December</option>
//       </select>

//       <textarea
//         placeholder="Notes"
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         className="w-full p-2 rounded bg-gray-700"
//       />

//       <button
//         onClick={add}
//         className="bg-blue-500 w-full p-2 rounded font-bold"
//       >
//         Add Entry
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

export default function TransactionForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [notes, setNotes] = useState("");

  const month =
    localStorage.getItem("month") || "January";




  const submit = async () => {
    const num = Number(amount);

    if (!num) {
      toast.error("Enter amount");
      return;
    }

    try {
      await api.post("/transactions", {
        title:
          type === "income"
            ? "Salary"
            : title,
        amount: num,
        type,
        category:
          type === "income"
            ? "Income"
            : category,
        notes,
        month,
      });

      toast.success("Transaction added");

      // 🔥 notify app to refresh
      window.dispatchEvent(
        new Event("transactionsUpdated")
      );

      setTitle("");
      setAmount("");
      setNotes("");
    } catch {
      toast.error("Failed to add");
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">

      <h2 className="text-lg font-bold">
        Add Transaction
      </h2>

      <div className="flex gap-2">
        <button
          onClick={() => setType("expense")}
          className={`flex-1 p-2 rounded-lg ${
            type === "expense"
              ? "bg-red-500/20 text-red-400"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Expense
        </button>

        <button
          onClick={() => setType("income")}
          className={`flex-1 p-2 rounded-lg ${
            type === "income"
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Income
        </button>
      </div>

      {type === "expense" && (
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-white/10"
        />
      )}

      <input
        placeholder={
          type === "income"
            ? "Enter your salary"
            : "Enter amount"
        }
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="w-full p-2 rounded-lg bg-gray-800 border border-white/10"
      />

      <select
  value={month}
  onChange={(e) =>
    localStorage.setItem("month", e.target.value)
  }
  className="w-full p-2 rounded bg-gray-800 border border-white/10"
>
  <option>January</option>
  <option>February</option>
  <option>March</option>
  <option>April</option>
  <option>May</option>
  <option>June</option>
  <option>July</option>
  <option>August</option>
  <option>September</option>
  <option>October</option>
  <option>November</option>
  <option>December</option>
</select>


      {type === "expense" && (
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-white/10"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Rent</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>
        </select>
      )}

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="w-full p-2 rounded-lg bg-gray-800 border border-white/10"
      />

      <button
        onClick={submit}
        className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg font-bold transition-all"
      >
        Add Transaction
      </button>
    </div>
  );
}
