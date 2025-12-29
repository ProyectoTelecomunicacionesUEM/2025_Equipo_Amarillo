// src/app/test/page.js
'use client';

import { useState } from 'react';

export default function TestPage() {
  const [id, setId] = useState('');
  const [device, setDevice] = useState('');
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [response, setResponse] = useState(null);

  const sendData = async () => {
    const res = await fetch('/api/receive-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        device: device,
        payload: { nombre: nombre, valor: valor ? parseFloat(valor) : undefined }
      })
    });
    const data = await res.json();
    setResponse(data);
  };




  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <h1>Prueba de API</h1>
      
      <div>
        <label>Id:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <label>Device:</label>
        <input
          type="text"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        /> 
      </div>     
      <div>
        <label>Métrica:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Valor:</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      
      <button onClick={sendData}>Enviar datos</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}