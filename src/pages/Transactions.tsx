// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import { api } from "../services/api";

// export default function Transactions() {
//   const [data, setData] = useState<any[]>([]);
//   const [editing, setEditing] = useState<any | null>(null);

//   const month = localStorage.getItem("month") || "January";

//   const fetch = async () => {
//     const res = await api.get("/transactions");
//     setData(res.data.filter((tx: any) => tx.month === month));
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   const remove = async (id: number) => {
//     await api.delete(`/transactions/${id}`);
//     fetch();
//   };

//   const saveEdit = async () => {
//     if (!editing) return;

//     await api.put(`/transactions/${editing.id}`, editing);
//     setEditing(null);
//     fetch();
//   };

//   const income = data.filter((tx) => tx.type === "income");
//   const expense = data.filter((tx) => tx.type === "expense");

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">
//         {month} Transactions
//       </h1>

//       {/* Income */}
//       <h2 className="text-green-400 mb-2">Income</h2>
//       {income.map((tx) => (
//         <Card tx={tx} edit={setEditing} remove={remove} />
//       ))}

//       {/* Expense */}
//       <h2 className="text-red-400 mt-6 mb-2">Expenses</h2>
//       {expense.map((tx) => (
//         <Card tx={tx} edit={setEditing} remove={remove} />
//       ))}

//       {/* EDIT MODAL */}
//       {editing && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-xl w-96 space-y-3">
//             <h2 className="text-xl font-bold">Edit Entry</h2>

//             {editing.type === "expense" && (
//               <input
//                 value={editing.title}
//                 onChange={(e) =>
//                   setEditing({ ...editing, title: e.target.value })
//                 }
//                 className="w-full p-2 rounded bg-gray-700"
//               />
//             )}

//             <input
//               value={editing.amount}
//               onChange={(e) =>
//                 setEditing({
//                   ...editing,
//                   amount: Number(e.target.value),
//                 })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             />

//             <textarea
//               value={editing.notes || ""}
//               onChange={(e) =>
//                 setEditing({ ...editing, notes: e.target.value })
//               }
//               className="w-full p-2 rounded bg-gray-700"
//             />

//             <div className="flex gap-2">
//               <button
//                 onClick={saveEdit}
//                 className="bg-green-600 flex-1 p-2 rounded"
//               >
//                 Save
//               </button>

//               <button
//                 onClick={() => setEditing(null)}
//                 className="bg-red-600 flex-1 p-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

// function Card({
//   tx,
//   edit,
//   remove,
// }: {
//   tx: any;
//   edit: any;
//   remove: any;
// }) {
//   return (
//     <div className="bg-gray-700 p-3 rounded mb-2 flex justify-between items-center">
//       <div>
//         <p>{tx.title}</p>
//         <div className="text-xs text-gray-400">
//           {tx.category}
//         </div>
//       </div>

//       <div className="flex gap-3 items-center">
//         <span
//           className={
//             tx.type === "income"
//               ? "text-green-400"
//               : "text-red-400"
//           }
//         >
//           {tx.type === "income" ? "+" : "-"}
//           {tx.amount}
//         </span>

//         <button
//           onClick={() => edit(tx)}
//           className="text-yellow-400 text-sm"
//         >
//           edit
//         </button>

//         <button
//           onClick={() => remove(tx.id)}
//           className="text-red-400 text-sm"
//         >
//           delete
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../services/api";
import toast from "react-hot-toast";

export default function Transactions() {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const month = localStorage.getItem("month") || "January";

  const fetch = async () => {
    const res = await api.get("/transactions");
    setData(res.data.filter((tx: any) => tx.month === month));
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id: number) => {
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Deleted successfully");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const saveEdit = async () => {
    if (!editing) return;

    try {
      await api.put(`/transactions/${editing.id}`, editing);
      toast.success("Updated successfully");
      setEditing(null);
      fetch();
    } catch {
      toast.error("Update failed");
    }
  };

  const income = data.filter((tx) => tx.type === "income");
  const expense = data.filter((tx) => tx.type === "expense");

  return (
    <Layout>
      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          {month} Transactions
        </h1>

        {/* Income */}
        <section>
          <h2 className="text-green-400 mb-3 text-lg font-semibold">
            Income
          </h2>

          <div className="space-y-3">
            {income.map((tx) => (
              <Card
                key={tx.id}
                tx={tx}
                edit={setEditing}
                remove={remove}
              />
            ))}
          </div>
        </section>

        {/* Expense */}
        <section>
          <h2 className="text-red-400 mb-3 text-lg font-semibold">
            Expenses
          </h2>

          <div className="space-y-3">
            {expense.map((tx) => (
              <Card
                key={tx.id}
                tx={tx}
                edit={setEditing}
                remove={remove}
              />
            ))}
          </div>
        </section>

      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6 rounded-2xl w-96 space-y-4">

            <h2 className="text-xl font-bold">
              Edit Entry
            </h2>

            {editing.type === "expense" && (
              <input
                value={editing.title}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 rounded bg-gray-800 border border-white/10"
              />
            )}

            <input
              value={editing.amount}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  amount: Number(e.target.value),
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-white/10"
            />

            <textarea
              value={editing.notes || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  notes: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-white/10"
            />

            <div className="flex gap-3">
              <button
                onClick={saveEdit}
                className="flex-1 bg-green-600 hover:bg-green-500 p-2 rounded-lg font-semibold transition"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Card({
  tx,
  edit,
  remove,
}: {
  tx: any;
  edit: any;
  remove: any;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 transition">

      <div>
        <p className="font-semibold">
          {tx.title}
        </p>

        <p className="text-xs text-gray-400">
          {tx.category}
        </p>
      </div>

      <div className="flex gap-3 items-center">

        <span
          className={`font-bold ${
            tx.type === "income"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {tx.type === "income" ? "+" : "-"}
          {tx.amount}
        </span>

        <button
          onClick={() => edit(tx)}
          className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm font-semibold"
        >
          Edit
        </button>

        <button
          onClick={() => remove(tx.id)}
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
