import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

type Role = "user" | "admin";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as { role?: Role }).role;

  if (role !== "admin") {
    redirect("/welcome");
  }

  return (
    <main className="max-w-5xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-semibold mb-2">Panel de administrador</h1>
      <p className="text-gray-600">
        Solo accesible si tu usuario tiene rol admin.
      </p>

      {/* Botón para ir al monitor */}
      <div className="mt-6">
        <Link
          href="/monitor"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Supervisar
        </Link>
      </div>

      {/* Aquí dentro luego metemos lo de sensores/estadísticas */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-700">
          Área admin (demo). Aquí puedes añadir widgets como sensores, tablas, etc.
        </p>
      </div>
    </main>
  );
}



/*import { redirect } from "next/navigation";
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

      {// Aquí dentro luego metemos lo de sensores/estadísticas /}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-700">
          Área admin (demo). Aquí añadimos widgets como sensores, tablas, etc.
        </p>
      </div>
    </main>
  );
}
*/