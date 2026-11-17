"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard({ user, onLogout }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${API}/history`)
      .then((r) => r.json())
      .then(setHistory)
      .catch(() => setHistory([]));
  }, []);

  const totalRows = history.reduce((sum, h) => sum + (h.rows_count || 0), 0);
  const last = history[0];

  const stats = [
    { label: "Total uploads", value: history.length },
    { label: "Total rows saved", value: totalRows.toLocaleString("en-IN") },
    { label: "Last upload", value: last ? String(last.upload_date).slice(0, 10) : "-" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-60 flex-col bg-slate-900 p-5 text-white md:flex">
        <h1 className="mb-8 text-xl font-semibold">Admin panel</h1>
        <nav className="flex flex-col gap-1 text-sm">
          <a className="rounded bg-slate-800 px-3 py-2">Dashboard</a>
          <a className="rounded px-3 py-2 text-slate-300 hover:bg-slate-800">Uploads</a>
          <a className="rounded px-3 py-2 text-slate-300 hover:bg-slate-800">Users</a>
        </nav>
        <button onClick={onLogout} className="mt-auto rounded bg-slate-800 py-2 text-sm hover:bg-slate-700">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
          <button onClick={onLogout} className="rounded border px-3 py-1.5 text-sm md:hidden">
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-semibold">All uploads</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="py-2">Date</th>
                <th>File</th>
                <th>Rows</th>
                <th>Uploaded at</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{String(h.upload_date).slice(0, 10)}</td>
                  <td>{h.file_name}</td>
                  <td>{h.rows_count}</td>
                  <td>{new Date(h.uploaded_at).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}