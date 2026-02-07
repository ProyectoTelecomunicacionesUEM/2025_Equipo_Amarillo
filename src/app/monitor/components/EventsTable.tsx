interface EventsTableProps {
  events: Array<{
    id: string;
    device: string;
    payload: any;
    createdAt: string;
  }>;
}

export default function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Registro de Eventos</h2>
        <p className="text-sm text-gray-500 mt-1">
          Total: {events.length} eventos
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payload
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha/Hora
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {event.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {event.device}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <pre className="text-xs text-gray-700 bg-gray-50 p-2 rounded max-w-md overflow-auto">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.createdAt).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-500 text-lg">No hay eventos registrados</p>
        </div>
      )}
    </div>
  );
}