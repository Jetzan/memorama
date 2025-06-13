import { useNavigate } from "react-router-dom";
import "./Bienvenida.css";
import { fetchGenerarTablero } from "../api.ts"; // Ajusta el path según tu estructura
import { useTablero } from "../context/TableroContext.tsx";
import { useJugando } from "../context/JugandoContext.tsx";

function Bienvenida() {
  const { tablero } = useTablero();
  const navigate = useNavigate();

  const { setJugando } = useJugando();
  const handleGenerarTablero = async () => {
    try {
      await fetchGenerarTablero(tablero);

      // Aquí puedes guardar el tablero en un estado o contexto si lo necesitas
    } catch (error) {
      alert("Error al generar el tablero desde Bienvenida.tsx: " + error);
    }
  };

  let handleCLick = async () => {
    try {
      if (!tablero) {
        alert("Selecciona una dificultad");
        return;
      } // evitar null o vacío
      await handleGenerarTablero();
      setJugando(true);
      navigate("/juego");
    } catch (e) {
      console.log("Error navegando a Juego:", e);
    }
  };

  return (
    <>
      <main id="main-bienvenida">
        <div id="bienvenida">
          <img src="./images/fondoBienvenido.png" alt="" />
          <button id="button-inicio" onClick={handleCLick}>
            INICIO
          </button>
        </div>
      </main>
    </>
  );
}

export default Bienvenida;
