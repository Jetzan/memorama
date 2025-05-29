//Importa la liberia axios que facilita las solicitudes HTTP
import axios from 'axios';


//Se define la URL del backend 
//http://localhost:3000/api/auth es donde esta corriendo el servidor Node.js (Backend)
const API = 'http://172.16.135.36:3000/login/api/auth';



export const login = async (nombre: string) => {
  //Hace un peticion POST a la api y manda en el body el nombre del usuario
  const res = await axios.post(`${API}/login`, { nombre });
  //Retorna la respuesta del servidor
  return res.data;
};
