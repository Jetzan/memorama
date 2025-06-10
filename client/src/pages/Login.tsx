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
  e.preventDefault();

  const apiBaseUrl = `http://${window.location.hostname}:3000`;

  try {
    const res = await axios.post(`${apiBaseUrl}/api/auth/login`, { nombre });
    setUser(res.data.usuario);
    navigate("/bienvenida");
  } catch (err) {
    console.warn("Primer intento fallido, reintentando...");

    // Espera 500ms y reintenta una vez más
    setTimeout(async () => {
      try {
        const res = await axios.post(`${apiBaseUrl}/api/auth/login`, { nombre });
        setUser(res.data.usuario);
        navigate("/bienvenida");
      } catch (err2) {
        alert("Error al iniciar sesión");
      }
    }, 500);
  }
};


  return (
    <main id="main-login">
    <form id="form-login" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <div id="container-login">
        <input
          id="input-login"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="input-login" id="label-login" >Nombre: </label>
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
