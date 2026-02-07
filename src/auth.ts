import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "@node-rs/bcrypt";
import { pool } from "@/lib/db";

type Role = "user" | "admin";

type AppUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

type AppToken = {
  role?: Role;
};

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

        // ✅ DEMOS
        if (email === "admin@iotcar.com" && password === "Admin123!") {
          return { id: "demo-admin", email, name: "Admin Demo", role: "admin" } satisfies AppUser;
        }
        if (email === "user@iotcar.com" && password === "User123!") {
          return { id: "demo-user", email, name: "User Demo", role: "user" } satisfies AppUser;
        }

        // ✅ Login real por BD (tu tabla NO tiene role, así que role = "user")
        const { rows } = await pool.query(
          "SELECT id, email, password_hash, name FROM users WHERE email=$1 LIMIT 1",
          [email]
        );

        const user = rows[0];
        if (!user) return null;

        const ok = await compare(password, user.password_hash);
        if (!ok) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
          role: "user",
        } satisfies AppUser;
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AppUser;
        (token as AppToken).role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as AppToken;
      if (session.user) {
        (session.user as DefaultSession["user"] & { role?: Role }).role = t.role ?? "user";
      }
      return session;
    },
  },
});

export const { handlers, auth } = handler;
export const { GET, POST } = handlers;
