"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";

type Role = "user" | "admin";

const USER_REDIRECT = "/welcome";
const ADMIN_REDIRECT = "/admin";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("user");

  const [email, setEmail] = useState("demo@finwise.dev");
  const [password, setPassword] = useState("Demo123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // (Opcional) Si el usuario vuelve a la página, mantener el rol que eligió
  useEffect(() => {
    try {
      const saved = localStorage.getItem("iotcar_role") as Role | null;
      if (saved === "user" || saved === "admin") setRole(saved);
    } catch {}
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const callbackUrl = role === "admin" ? ADMIN_REDIRECT : USER_REDIRECT;

    try {
      const csrfToken = await getCsrfToken();

      // Guardamos el rol (solo frontend)
      try {
        localStorage.setItem("iotcar_role", role);
      } catch {}

      const res = await signIn("credentials", {
        email,
        password,
        csrfToken: csrfToken ?? undefined,
        redirect: false,
        callbackUrl,
        // Si en el futuro quieres que el backend lo use, lo mandas también:
        // role,
      });

      if (res?.error) {
        setError(
          "Email o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo."
        );
      } else if (res?.url) {
        window.location.href = res.url;
      } else {
        setError("No se pudo completar el inicio de sesión.");
      }
    } catch {
      setError("Error inesperado, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 mt-24">
      <h1 className="text-3xl font-semibold mb-2">Iniciar sesión</h1>
      <p className="text-gray-600 mb-6">
        Elige cómo quieres entrar: <b>Usuario</b> o <b>Administrador</b>.
      </p>

      {/* Selector de rol */}
      <div className="mb-6">
        <div className="inline-flex w-full rounded-full bg-hero-background p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={[
              "flex-1 rounded-full px-4 py-2 text-sm font-medium transition",
              role === "user"
                ? "bg-primary text-black"
                : "text-foreground hover:bg-white/70",
            ].join(" ")}
          >
            Usuario
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={[
              "flex-1 rounded-full px-4 py-2 text-sm font-medium transition",
              role === "admin"
                ? "bg-primary text-black"
                : "text-foreground hover:bg-white/70",
            ].join(" ")}
          >
            Administrador
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Destino:{" "}
          <span className="font-medium text-gray-700">
            {role === "admin" ? ADMIN_REDIRECT : USER_REDIRECT}
          </span>
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Password"
          aria-label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          className="bg-black text-white rounded px-3 py-2 disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Entrando..." : `Entrar como ${role === "admin" ? "Admin" : "Usuario"}`}
        </button>
      </form>
    </main>
  );
}

