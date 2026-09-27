"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/api";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result =
        mode === "login"
          ? await login(username, password)
          : await register(username, password);

      if (result.token && result.user) {
        localStorage.setItem("learning_token", result.token);
        localStorage.setItem("learning_username", result.user.username);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand">
          <div className="brand-icon">L</div>
          <div>
            <p className="eyebrow">LEARNING PLATFORM</p>
            <h1>LearnSpace</h1>
          </div>
        </div>

        <div className="tabs">
          <button
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => switchMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "tab active" : "tab"}
            onClick={() => switchMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <div className="heading">
          <h2>{mode === "login" ? "Welcome back." : "Create your account."}</h2>
          <p>
            {mode === "login"
              ? "Masuk untuk melanjutkan perjalanan belajarmu."
              : "Buat akun menggunakan username dan password."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="submit" disabled={loading} type="submit">
            {loading
              ? "Memproses..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </button>
        </form>

        <p className="footer-note">
          Tidak perlu email. Cukup username dan password.
        </p>
      </section>
    </main>
  );
}
