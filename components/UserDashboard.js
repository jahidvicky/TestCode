"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserDashboard({ user, onLogout }) {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function onUpload() {
    if (!file || !date) return;
    setLoading(true);
    setStatus(null);

    const body = new FormData();
    body.append("file", file);
    body.append("upload_date", date);

    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body });
      const data = await res.json();
      setStatus({ type: res.ok ? "ok" : "err", text: data.message ?? "Kuch galat hua" });
      if (res.ok) setFile(null);
    } catch {
      setStatus({ type: "err", text: "Server se connect nahi ho pa raha." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="font-semibold">Daily Upload</span>
        <div className="flex items-center gap-4 text-sm">
          <span>Hi, {user.name}</span>
          <button onClick={onLogout} className="rounded border px-3 py-1.5 hover:bg-neutral-50">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-md px-4">
        <h2 className="mb-1 text-2xl font-semibold">Upload today&apos;s sheet</h2>
        <p className="mb-6 text-sm text-neutral-500">
          Date chuno, Excel file select karo aur upload dabao.
        </p>

        <div className="flex flex-col gap-4 rounded-xl border p-5">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded border p-2"
          />
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="rounded border p-2"
          />
          <button
            onClick={onUpload}
            disabled={!file || !date || loading}
            className="rounded bg-[#0d6efd] p-2.5 font-medium text-white disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload data"}
          </button>
          {status && (
            <p className={status.type === "ok" ? "text-green-700" : "text-red-700"}>
              {status.text}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}