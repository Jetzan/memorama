
export async function fetchUsuarios() {
  const res = await fetch('http://localhost:3000/login/api/users');
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}
export async function fetchGenerarTablero(dificultadSeleccionada: string) {
  const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000`;

  try {
    const res = await fetch(`${API_BASE}/api/tablero/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dificultad: dificultadSeleccionada }),
    });

    if (!res.ok) throw new Error('Primera petición fallida');
    return await res.json();
  } catch (error) {
    console.warn("Primer intento falló, reintentando en 500ms...");

    // Reintento tras 500ms
    await new Promise((res) => setTimeout(res, 500));

    const res2 = await fetch(`${API_BASE}/api/tablero/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dificultad: dificultadSeleccionada }),
    });

    if (!res2.ok) throw new Error('Error al generar el tablero en el fetch');
    return await res2.json();
  }
}

export async function fetchObtenerValor(fila:number,columna:number) {
   const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000`;
  console.log(fila+" ,,, "+columna )
 const res = await fetch(`${API_BASE}/api/tablero/valor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x: columna,y:fila }),
  });

  if (!res.ok) throw new Error('Error al obtener el valor');
  return res.json();
}

export async function fetchActualizarJugador(
  nombre: string,
  campos: { [key: string]: number }
) {
  const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000`;

  const res = await fetch(`${API_BASE}/api/auth/actualizar`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, campos }),
  });

  if (!res.ok) throw new Error('Error al actualizar jugador');
  return await res.json();
}
