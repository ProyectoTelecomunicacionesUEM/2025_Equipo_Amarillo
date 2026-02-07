import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// 1. Definimos la estructura de la fila de la base de datos
interface EventRow {
  id?: string;
  device?: string;
  payload: string | object;
  created_at?: string;
}

export async function GET() {
  try {
    // Obtener estadísticas
    const statsQuery = `
    SELECT 
        COUNT(DISTINCT id) as ids_distintos,
        COUNT(*) as total_eventos,
        COUNT(*) FILTER (
          WHERE register >= NOW() - INTERVAL '20 minutes'
        ) as eventos_20min
      FROM events
    `;

    const statsResult = await pool.query(statsQuery);
    const stats = statsResult.rows[0];

    // Obtener todos los eventos
    const eventsQuery = `
    SELECT *
      FROM events
    `;

    const eventsResult = await pool.query(eventsQuery);

    // 2. Aplicamos el tipo EventRow en el map y eliminamos el any de payloadData
    const events = eventsResult.rows.map((row: EventRow) => {
      let payloadData: Record<string, unknown> = {}; 
      
      try {
        payloadData = typeof row.payload === 'string' 
          ? JSON.parse(row.payload) 
          : (row.payload as Record<string, unknown>);
      } catch (error) {
        console.warn('Error parseando payload:', error);
      }

      return {
        id: row.id || 'N/A',
        device: row.device || 'N/A',
        payload: payloadData,
        createdAt: row.created_at || new Date().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        idsDistintos: parseInt(stats.ids_distintos || '0'),
        totalEventos: parseInt(stats.total_eventos || '0'),
        eventos20Min: parseInt(stats.eventos_20min || '0'),
      },
      events,
    });

  } catch (error) {
    console.error('Error en API monitor:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener datos',
        details: error instanceof Error ? error.message : 'Desconocido'
      },
      { status: 500 }
    );
  }
}