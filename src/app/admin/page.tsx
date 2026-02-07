import { redirect } from "next/navigation";
import { auth } from "@/auth";

type Role = "user" | "Consola";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as { role?: Role }).role;

  if (role !== "Consola") {
    redirect("/welcome");
  }

  return (
    <main className="max-w-5xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-semibold mb-2">Panel de administrador</h1>
      <p className="text-gray-600">
       
      </p>

      {/* Aquí dentro luego metemos lo de sensores/estadísticas */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-700">
          Área admin (demo). Aquí añadimos widgets como sensores, tablas, etc.
        </p>
      </div>
    </main>
  );
}
