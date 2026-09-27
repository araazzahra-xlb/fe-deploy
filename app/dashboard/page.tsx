"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verify } from "@/lib/api";

type User = {
  username: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("learning_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    verify(token)
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("learning_token");
        localStorage.removeItem("learning_username");
        router.replace("/login");
      })
      .finally(() => setChecking(false));
  }, [router]);

  function logout() {
    localStorage.removeItem("learning_token");
    localStorage.removeItem("learning_username");
    router.replace("/login");
  }

  if (checking || !user) {
    return (
      <main className="dashboard-loading">
        <p>Memuat dashboard...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-icon small">L</div>
          <strong>LearnSpace</strong>
        </div>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </nav>

      <section className="dashboard-content">
        <div className="welcome">
          <p className="eyebrow">DASHBOARD BELAJAR</p>
          <h1>Selamat datang, {user.username}</h1>
          <p>
            Atur proses belajarmu, pantau progres, dan terus berkembang sedikit
            demi sedikit.
          </p>
        </div>

        <div className="learning-grid">
          <article className="learning-card primary">
            <span className="card-label">CONTINUE LEARNING</span>
            <h2>Web Development</h2>
            <p>Pelajari dasar frontend, backend, API, dan arsitektur aplikasi.</p>
            <div className="progress">
              <span style={{ width: "68%" }} />
            </div>
            <small>68% completed</small>
          </article>

          <article className="learning-card">
            <span className="card-label">UP NEXT</span>
            <h2>Database</h2>
            <p>Pelajari bagaimana aplikasi menyimpan dan mengelola data.</p>
            <button className="card-button">Mulai belajar →</button>
          </article>

          <article className="learning-card">
            <span className="card-label">GOAL</span>
            <h2>Build a Project</h2>
            <p>Gabungkan materi yang sudah dipelajari menjadi project nyata.</p>
            <button className="card-button">Lihat project →</button>
          </article>
        </div>
      </section>
    </main>
  );
}
