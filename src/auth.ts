import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "@node-rs/bcrypt";
import { pool } from "@/lib/db";

type Role = "user" | "admin";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { email, password } = credentials;
        if (typeof email !== "string" || typeof password !== "string") return null;

        // ✅ 2 DEMOS (sin selector)
        if (email === "admin@iotcar.com" && password === "Admin123!") {
          return { id: "demo-admin", email, name: "Admin Demo", role: "admin" as Role };
        }

        if (email === "user@iotcar.com" && password === "User123!") {
          return { id: "demo-user", email, name: "User Demo", role: "user" as Role };
        }

        // ✅ Login real por BD
        // Nota: si NO existe la columna role, el try/catch hace fallback
        let user: any = null;

        try {
          const { rows } = await pool.query(
            "SELECT id, email, password_hash, name, role FROM users WHERE email=$1 LIMIT 1",
            [email]
          );
          user = rows[0];
        } catch {
          // Fallback si la columna role no existe todavía
          const { rows } = await pool.query(
            "SELECT id, email, password_hash, name FROM users WHERE email=$1 LIMIT 1",
            [email]
          );
          user = rows[0];
        }

        if (!user) return null;

        const ok = await compare(password, user.password_hash);
        if (!ok) return null;

        const role: Role = user.role === "admin" ? "admin" : "user";

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
          role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = (token as any).role ?? "user";
      return session;
    },
  },
});

export const { handlers, auth } = handler;
export const { GET, POST } = handlers;
