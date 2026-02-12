// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// type Transaction = {
//   id: number;
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
//   notes?: string;
//   month:string;
// };

// export default function TransactionList({ month }: { month: string }) {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [editing, setEditing] = useState<Transaction | null>(null);

//   const fetchTransactions = async () => {
//     const res = await api.get("/transactions");

// setTransactions(
//   res.data.filter((tx: any) => tx.month === month)
// );

//    // setTransactions(res.data);


//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const deleteTx = async (id: number) => {
//     await api.delete(`/transactions/${id}`);
//     fetchTransactions();
//   };

//   const updateTx = async () => {
//     if (!editing) return;

//     await api.put(`/transactions/${editing.id}`, editing);
//     setEditing(null);
//     fetchTransactions();
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Transactions</h2>

//       <div className="space-y-3">
//         {transactions.map((tx) => (
//           <div key={tx.id} className="bg-gray-700 p-3 rounded space-y-1">
//             <div className="flex justify-between">
//               <span className="font-semibold">{tx.title}</span>

//               <span
//                 className={
//                   tx.type === "expense"
//                     ? "text-red-400"
//                     : "text-green-400"
//                 }
//               >
//                 {tx.type === "expense" ? "-" : "+"}
//                 {tx.amount}
//               </span>
//             </div>

//             <div className="text-xs text-blue-400">
//               Category: {tx.category}
//             </div>

//             <div className="text-xs text-purple-400">
//   Month: {tx.month}
// </div>


//             {tx.notes && (
//               <div className="text-xs text-gray-400">
//                 Note: {tx.notes}
//               </div>
//             )}

//             <div className="flex gap-3 mt-1">
//               <button
//                 onClick={() => setEditing(tx)}
//                 className="text-xs text-yellow-300"
//               >
//                 edit
//               </button>

//               <button
//                 onClick={() => deleteTx(tx.id)}
//                 className="text-xs text-red-300"
//               >
//                 delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Popup */}
//       {editing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-xl space-y-2 w-80">
//             <h2 className="font-bold">Edit Transaction</h2>

//             <input
//               value={editing.title}
//               onChange={(e) =>
//                 setEditing({ ...editing, title: e.target.value })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             />

//             <input
//               value={editing.amount}
//               onChange={(e) =>
//                 setEditing({ ...editing, amount: Number(e.target.value) })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             />

//             <select
//               value={editing.category}
//               onChange={(e) =>
//                 setEditing({ ...editing, category: e.target.value })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             >
//               <option>Food</option>
//               <option>Travel</option>
//               <option>Rent</option>
//               <option>Salary</option>
//               <option>Shopping</option>
//               <option>Bills</option>
//               <option>Health</option>
//               <option>Other</option>
//             </select>

//             <textarea
//               value={editing.notes || ""}
//               onChange={(e) =>
//                 setEditing({ ...editing, notes: e.target.value })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             />

//             <button
//               onClick={updateTx}
//               className="bg-green-500 w-full p-2 rounded"
//             >
//               Save
//             </button>

//             <button
//               onClick={() => setEditing(null)}
//               className="bg-red-500 w-full p-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

export default function TransactionList({ month }: any) {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const fetch = async () => {
    const res = await api.get("/transactions");
    setData(res.data);
  };

  useEffect(() => {
    fetch();

    window.addEventListener("transactionsUpdated", fetch);

    return () =>
      window.removeEventListener(
        "transactionsUpdated",
        fetch
      );
  }, []);

  const filtered = data.filter((tx) => tx.month === month);

  const del = async (id: number) => {
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Deleted");

      window.dispatchEvent(
        new Event("transactionsUpdated")
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  const saveEdit = async () => {
    try {
      await api.put(
        `/transactions/${editing.id}`,
        editing
      );

      toast.success("Updated");

      setEditing(null);

      window.dispatchEvent(
        new Event("transactionsUpdated")
      );
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-3">

      {filtered.map((tx) => (
        <div
          key={tx.id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition"
        >
          <div>
            <p className="font-semibold">
              {tx.title}
            </p>

            <p className="text-xs text-gray-400">
              {tx.category} • {tx.notes}
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span
              className={`font-bold ${
                tx.type === "expense"
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              ₹{tx.amount}
            </span>

            <button
              onClick={() => setEditing(tx)}
              className="text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>

            <button
              onClick={() => del(tx.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-gray-900 p-6 rounded-xl w-80 space-y-3">

            <h2 className="font-bold">
              Edit transaction
            </h2>

            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  title: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800"
            />

            <input
              value={editing.amount}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  amount: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full p-2 rounded bg-gray-800"
            />

            <div className="flex gap-2">

              <button
                onClick={saveEdit}
                className="flex-1 bg-green-600 p-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditing(null)
                }
                className="flex-1 bg-gray-700 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

