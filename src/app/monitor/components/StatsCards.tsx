interface StatsCardsProps {
  stats: {
    idsDistintos: number;
    totalEventos: number;
    eventos20Min: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'IDs Distintos',
      value: stats.idsDistintos.toLocaleString(),
      icon: '🆔',
      color: 'bg-blue-100',
      description: 'Total de identificadores únicos',
    },
    {
      title: 'Eventos Totales',
      value: stats.totalEventos.toLocaleString(),
      icon: '📊',
      color: 'bg-green-100',
      description: 'Todos los registros en la base de datos',
    },
    {
      title: 'Últimos 20 Min',
      value: stats.eventos20Min.toLocaleString(),
      icon: '⏱️',
      color: 'bg-purple-100',
      description: 'Eventos recibidos en los últimos 20 minutos',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.description}</p>
            </div>
            <div className={`${card.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl`}>
              {card.icon}
            </div>
          </div>
          
          {/* Barra de progreso visual */}
          {index === 2 && stats.totalEventos > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((stats.eventos20Min / stats.totalEventos) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {((stats.eventos20Min / stats.totalEventos) * 100).toFixed(1)}% del total
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}