import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const role = (session.user as any).role;
  if (role !== "admin") redirect("/welcome");

  return (
    <main className="max-w-4xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-semibold mb-4">Panel de administrador</h1>
      <p className="text-gray-600">Solo accesible si tu usuario tiene rol admin.</p>
    </main>
  );
}
