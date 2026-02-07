'use client';

import { useEffect, useState, useRef } from 'react';
import StatsCards from './components/StatsCards';
import EventsTable from './components/EventsTable';

interface MonitorData {
  success: boolean;
  stats: {
    idsDistintos: number;
    totalEventos: number;
    eventos20Min: number;
  };
  events: any[];
}

export default function MonitorPage() {
  const [data, setData] = useState<MonitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    
    // Configurar intervalo según el estado de autoRefresh
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchData, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/monitor', { cache: 'no-store' });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoRefreshChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoRefresh(e.target.checked);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600 mb-4 break-all">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LOTCAR - Monitor de Eventos</h1>
            <p className="text-sm text-gray-500 mt-1">
              Panel de control en tiempo real
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        {data && <StatsCards stats={data.stats} />}

        {/* Panel de controles - Entre gráficas y tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={handleAutoRefreshChange}
                    className="sr-only"
                  />
                  <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${
                    autoRefresh ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <div className={`absolute left-1 top-1 bg-white border border-gray-300 rounded-full transition-transform duration-300 transform ${
                    autoRefresh ? 'translate-x-5' : 'translate-x-0'
                  } w-5 h-5`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-gray-700">
                  Actualización automática
                </div>
              </label>
              {autoRefresh && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  Cada 5 segundos
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Última actualización: {lastUpdate ? lastUpdate.toLocaleTimeString('es-ES') : 'Nunca'}
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Actualizar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Eventos */}
        {data && <EventsTable events={data.events} />}
      </main>

      {/* Footer con timestamp */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          <p>
            {new Date().toLocaleString('es-ES')}
          </p>
        </div>
      </footer>
    </div>
  );
}