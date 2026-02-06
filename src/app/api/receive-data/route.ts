// src/app/api/receive-data/route.ts

import { z } from 'zod';
import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

// Clave secreta para autenticación (Configúrala en tu archivo .env como API_SECRET)
const API_SECRET = process.env.API_SECRET || 'mi-clave-secreta-por-defecto';

function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  // Verifica que el header sea "Bearer <TU_CLAVE>"
  return authHeader === `Bearer ${API_SECRET}`;
}

// Esquema de validación de datos entrantes

const DataSchema = z.object({
  id: z.string().min(1),
  device: z.string().min(1),
  payload: z.object({
    nombre: z.string().min(1),
    valor: z.number().optional(),
  }),
});



// Usar DATABASE_URL para la conexión (incluye ssl si es necesario)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}); 


// POST EXAMPLE:
//
// CMD
// curl.exe -X POST "http://localhost:3000/api/receive-data" -H "Content-Type: application/json" -d "{\"id\":\"XCUST0001\",\"device\":\"1\",\"payload\":{\"nombre\":\"temperatura\",\"valor\":60}}"
//
// PowerShell
// curl.exe -X POST 'http://localhost:3000/api/receive-data' -H 'Content-Type: application/json' -d '{\"id\":\"XCUST0001\",\"device\":\"1\",\"payload\":{\"nombre\":\"temperatura\",\"valor\":60}}'
//
// Manejar POST Method API. Método para recibir y almacenar datos.

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
//export async function POST(request) {
  try {

    const body = await request.json();
    console.log('🔍 Cuerpo recibido (raw):', JSON.stringify(body));
    const validatedData = DataSchema.parse(body);

    const { id,device, payload } = validatedData;
    console.log('Datos recibidos:', validatedData);
    

    const query = 'INSERT INTO events (id, device, payload) VALUES ($1, $2, $3)';
    const values = [id, device, JSON.stringify(payload)];
    await pool.query(query, values);

    return NextResponse.json(
      { message: 'Datos almacenados correctamente.' },
      { status: 201 }
    );
  } 
  catch (error) {
    console.error('Error en POST /api/receive-data:', error);

    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Datos inválidos',
          details: error.issues.map(e => ({       
            path: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    

    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor Alex'},
      { status: 500 }
    );
}
}

// Métodos HTTP no permitidos
// GET: Recuperar datos del servidor.
// export const GET = () => NextResponse.json({ error: 'Método Obtenerno NO permitido' }, { status: 405 });

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return new NextResponse(
      `<pre>Error: No autorizado.</pre>`,
      { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const device = searchParams.get('device');

    if (!device || device.trim() === '') {
      return new NextResponse(
        `<pre>Error: El parámetro 'device' es requerido.</pre>`,
        { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // ✅ Asegúrate de que la columna 'device' exista en la tabla
    const query = 'SELECT id, device, payload FROM events WHERE device = $1';
    const values = [device];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return new NextResponse(
        `<pre>No se encontraron registros para el device "${device}".</pre>`,
        { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    let output = `<pre>Registros encontrados para device "${device}":\n\n`;
    result.rows.forEach((row, index) => {
      output += `#${index + 1}:\n`;
      output += `  ID:       ${row.id}\n`;
      output += `  Device:   ${row.device}\n`; // Incluir el device en la salida
      output += `  Payload:  ${JSON.stringify(row.payload, null, 2).replace(/\n/g, '\n')}\n`; // Formatear JSON con indentación
  
    });
    output += `</pre>`;

    return new NextResponse(output, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } 
  
  
  catch (error) {
    console.error('Error en GET /api/receive-data:', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    //const errorMessage = error instanceof Error ? error.message : 'Desconocido';
    return new NextResponse(
      `<pre>Error interno del servidor alex: ${errMsg}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}



// PUT: Actualizar completamente un recurso existente.
export const PUT = () => NextResponse.json({ error: 'Método Actualizarno NO permitido' }, { status: 405 });

// PATCH: Actualizar parcialmente un recurso existente.
export const PATCH = () => NextResponse.json({ error: 'Método Modificar NO permitido' }, { status: 405 });

// DELETE: Eliminar un recurso del servidor.            

// curl.exe -X DELETE "http://localhost:3000/api/receive-data?device=12" 

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const device = searchParams.get('device');

    if (!device || device.trim() === '') {
      return NextResponse.json(
        { error: 'El parámetro ${device} es requerido.' },
        { status: 400 }
      );
    }

    const query = 'DELETE FROM events WHERE device = $1';
    const values = [device];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'No se encontró ningún registro con device '+device+'.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Todos los Registros del device '+device+' eliminado correctamente.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al intentar eliminar el registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

// curl.exe -X DELETE "http://localhost:3000/api/receive-data?device=12"
