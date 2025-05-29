// src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Login.css";

//Componente login de React
function Login() {
  //Estado "nombre" para guardar el nombre del usuario
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  //Funcion ejecutada al presionar el boton
  const handleSubmit = async (e: React.FormEvent) => {
    //Cancela el comportamiento por defecto que tiene el event submit
    //ya que en caso de no hacerlo la pagina se recarga
    e.preventDefault();

    try {
      //Hace un post a la base de datos mandando el nombre ingresado
      const apiBaseUrl = `http://${window.location.hostname}:3000`;
      const res = await axios.post(`${apiBaseUrl}/api/auth/login`, { nombre });

      setUser(res.data.usuario); // Guarda usuario en contexto para poder usarlo y mostrarlo en el Juego
      navigate("/bienvenida"); // Redirige al tablero para poder jugar
    } catch (err) {
      //En caso de que haya un error muestra una alerta de "Error al iniciar sesion"
      alert("Error al iniciar sesión");
    }
  };

  return (
    <main id="main-login">
    <form id="form-login" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <div id="form-group">
        <label htmlFor="input-login">Nombre: </label>
        <input
          id="input-login"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de usuario"
        />
      </div>
      <button id="button-login" type="submit">
        Iniciar sesión
      </button>
    </form>
    </main>
  );
}

//Exporta el componente
export default Login;
