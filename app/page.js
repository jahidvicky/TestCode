"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        router.replace("/login"); // login nahi hai
      }
    } catch {
      router.replace("/login");
    }
    setReady(true);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user");
    router.replace("/login");
  }

  if (!ready || !user) return null; // check hone tak ya redirect hone tak kuch mat dikhao

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }
  return <UserDashboard user={user} onLogout={handleLogout} />;
}