"use client";

import { FormEvent, useState } from "react";
import { signIn, getCsrfToken, getSession } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("user@iotcar.com");
  const [password, setPassword] = useState("User123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const csrfToken = await getCsrfToken();

      const res = await signIn("credentials", {
        email,
        password,
        csrfToken: csrfToken ?? undefined,
        redirect: false,
      });

      if (res?.error) {
        setError(
          "Email o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo."
        );
        return;
      }

      // 👉 aquí el único cambio importante
      const session = await getSession();

      const role = (session?.user as any)?.role;

      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/welcome";
      }
    } catch {
      setError("Error inesperado, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 mt-24">
      <h1 className="text-3xl font-semibold mb-4">Iniciar sesión</h1>
      <p className="text-gray-600 mb-6">
        Entra con tus credenciales. Según el usuario, accederás como{" "}
        <b>usuario</b> o <b>admin</b>.
      </p>

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
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="text-xs text-gray-500 mt-2">
          <p>
            <b>Demo user:</b> user@iotcar.com / User123!
          </p>
          <p>
            <b>Demo admin:</b> admin@iotcar.com / Admin123!
          </p>
        </div>
      </form>
    </main>
  );
}
