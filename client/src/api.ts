
export async function fetchUsuarios() {
  const res = await fetch('http://localhost:3000/login/api/users');
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}
