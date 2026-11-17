"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn, FaPlay } from "react-icons/fa";

const DEMO_USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Admin" },
  { username: "user", password: "user123", role: "user", name: "Rahul" },
];

const socials = [
  { icon: FaFacebookF, color: "bg-[#1877f2]", label: "Facebook" },
  { icon: FaTwitter, color: "bg-[#1da1f2]", label: "Twitter" },
  { icon: FaGoogle, color: "bg-[#db4437]", label: "Google" },
  { icon: FaLinkedinIn, color: "bg-[#0e76a8]", label: "LinkedIn" },
];

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      setError("Username ya password galat hai.");
      return;
    }
    setError("");
    onLogin({ username: found.username, role: found.role, name: found.name });
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* LEFT: form */}
      <section className="flex flex-col items-center justify-between bg-white px-6 py-10">
        <div />

        <div className="w-full max-w-[410px]">
          <h1 className="mb-8 text-center text-4xl font-semibold tracking-tight text-neutral-900">
            Daily<span className="text-[#0d6efd]">Upload</span>
          </h1>

          <form onSubmit={onSubmit}>
            <div className="overflow-hidden rounded-lg border border-neutral-300">
              <input
                type="text"
                placeholder="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border-b border-neutral-300 px-4 py-3.5 outline-none placeholder:text-neutral-400 focus:bg-blue-50/40"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3.5 outline-none placeholder:text-neutral-400 focus:bg-blue-50/40"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-[#0d6efd] py-3.5 font-medium text-white transition hover:bg-[#0b5ed7]"
            >
              Sign In
            </button>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </form>

          <p className="mt-6 text-center">
            <a href="#" className="text-sm text-[#0d6efd] underline underline-offset-2">
              Forgot Password or Username?
            </a>
          </p>

          <div className="my-5 flex items-center gap-3 text-sm text-neutral-500">
            <span className="h-px flex-1 bg-neutral-300" />
            OR
            <span className="h-px flex-1 bg-neutral-300" />
          </div>

          <div className="flex justify-center gap-3">
            {socials.map(({ icon: Icon, color, label }) => (
              <button
                key={label}
                type="button"
                aria-label={`Sign in with ${label}`}
                className={`flex h-10 w-10 items-center justify-center rounded ${color} text-white transition hover:opacity-90`}
              >
                <Icon />
              </button>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-neutral-600">
            Don&apos;t have an Account? Sign Up as a:
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {["Personal", "Business"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-[#0d6efd] px-6 py-2 text-sm font-medium text-[#0d6efd] transition hover:bg-[#0d6efd] hover:text-white"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-600">
          Copyright © 2026{" "}
          <a href="#" className="text-[#0d6efd] underline">Your Company</a>. All Rights Reserved.
        </p>
      </section>

      {/* RIGHT: image panel (mobile par hidden) */}
      <section
        className="relative hidden bg-neutral-900 bg-cover bg-center md:flex md:items-center"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-xl px-20">
          <p className="mb-3 text-white">We are glad to see you again!</p>
          <h2 className="text-4xl font-medium leading-tight text-white">
            Upload today&apos;s sheet in just a few clicks!
          </h2>
          <button
            type="button"
            className="mt-8 flex items-center gap-2 rounded-md border border-white/80 px-6 py-3.5 font-medium text-white transition hover:bg-white hover:text-black"
          >
            <FaPlay className="text-sm" />
            Watch demo
          </button>
        </div>
      </section>
    </div>
  );
}