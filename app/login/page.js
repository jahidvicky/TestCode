"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  // pehle se login hai to seedha dashboard par bhejo
  useEffect(() => {
    try {
      if (localStorage.getItem("user")) router.replace("/");
    } catch {}
  }, [router]);

  function handleLogin(u) {
    localStorage.setItem("user", JSON.stringify(u));
    router.push("/");
  }

  return <LoginForm onLogin={handleLogin} />;
}