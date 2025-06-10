import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Bienvenida.css";
import { fetchGenerarTablero } from "../api.ts"; // Ajusta el path según tu estructura
import { useTablero } from "../context/TableroContext.tsx";
import { useJugando } from "../context/JugandoContext.tsx";


function Bienvenida() {
  const { user } = useUser();
  const { tablero } = useTablero();
  const navigate = useNavigate();

  const {jugando ,setJugando} = useJugando();
  const handleGenerarTablero = async () => {
        
      try {
          const generado = await fetchGenerarTablero(tablero);
          console.log("Tablero generado:", generado);

          // Aquí puedes guardar el tablero en un estado o contexto si lo necesitas
        } catch (error) {
          alert("Error al generar el tablero");
        }
      };

        

  let handleCLick = async () => {
  try {
    await handleGenerarTablero(); 
    console.log("aaaa");
    setJugando(true);
    navigate("/juego");
    console.log("si lo mando ");
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
