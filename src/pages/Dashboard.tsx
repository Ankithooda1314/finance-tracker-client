import { useState } from "react";
import Layout from "../components/Layout";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import { getUser, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();

  const [month, setMonth] = useState(
    localStorage.getItem("month") || "January"
  );

  return (
    <Layout>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Welcome, {user}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              localStorage.setItem(
                "month",
                e.target.value
              );
            }}
            className="bg-gray-700 p-2 rounded"
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

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 px-4 py-2 rounded font-bold"
          >
            Sign out
          </button>
        </div>
      </div>

      <SummaryCards month={month} />

      <div className="mt-6">
        <TransactionForm />
      </div>
    </Layout>
  );
}
