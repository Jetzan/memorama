import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTablero } from "../context/TableroContext";
import { useGano } from "../context/GanoContext";
import { usePuntaje } from "../context/PuntajeContext";
import { useJugando } from "../context/JugandoContext";
import { fetchObtenerValor, fetchGenerarTablero } from "../api";
import "./Juego.css";

// Función auxiliar para obtener fila y columna a partir del índice
function obtenerFilaColumna(index: number, columnas: number) {
  const fila = Math.floor(index / columnas);
  const columna = index % columnas;
  return { fila, columna };
}

function Juego() {
  // --- Contextos y hooks de estado global ---
  const { tablero } = useTablero();
  const { user } = useUser();
  const { setGano } = useGano();
  const { setPuntaje } = usePuntaje();
  const { setJugando } = useJugando();
  const navigate = useNavigate();

  // --- Hooks de estado local ---
  const [puntos, setPuntos] = useState(0);
  const [cartasVistas, setCartasVistas] = useState<Set<string>>(new Set());
  const [intentosFallidos, setIntentosFallidos] = useState<{ [key: string]: number }>({});
  const [cartasVolteadas, setCartasVolteadas] = useState<{ index: number; valor: string }[]>([]);
  const [cartasEncontradas, setCartasEncontradas] = useState<number[]>([]);

  // --- Configuración de filas y columnas según dificultad ---
  let filas = 3, columnas = 4;
  switch (tablero) {
    case "easy":
      filas = 3; columnas = 4; break;
    case "medium":
      filas = 4; columnas = 5; break;
    case "hard":
      filas = 4; columnas = 7; break;
  }
  const totalCartas = filas * columnas;
  const [imagenes, setImagenes] = useState<string[]>(
    Array(totalCartas).fill("images/tablero/Tapa.png")
  );

  // --- Handlers ---
  const handleVolverJugar = async () => {
    try {
      await fetchGenerarTablero(tablero);
      setCartasVolteadas([]);
      setCartasEncontradas([]);
      setImagenes(Array(totalCartas).fill("images/tablero/Tapa.png"));
      setPuntos(0);
      setIntentosFallidos({});
      setCartasVistas(new Set());
      setGano(false);
      setPuntaje(0);
      setJugando(false);
      setTimeout(() => setJugando(true), 100);
      window.location.href = "#juego";
    } catch (error) {
      alert("Error al volver a jugar");
    }
  };

  const handleRegresar = () => {
    setJugando(false);
    setGano(false);
    navigate("/bienvenida");
  };

  const handleObtenerValor = async (index: number) => {
    if (
      cartasVolteadas.some((c) => c.index === index) ||
      cartasEncontradas.includes(index)
    )
      return;

    const { fila, columna } = obtenerFilaColumna(index, columnas);

    try {
      const res = await fetchObtenerValor(fila, columna);
      const valor = res.valor;

      setImagenes((prev) => {
        const copia = [...prev];
        copia[index] = `images/tablero/${valor}.png`;
        return copia;
      });

      const nuevaCarta = { index, valor };
      const nuevasCartas = [...cartasVolteadas, nuevaCarta];
      setCartasVolteadas(nuevasCartas);

      if (nuevasCartas.length === 2) {
        const [c1, c2] = nuevasCartas;
        if (c1.valor === c2.valor) {
          setCartasEncontradas((prev) => [...prev, c1.index, c2.index]);
          setCartasVolteadas([]);
          setPuntos((prev) => prev + 10);
        } else {
          const key = `${c1.valor}-${c2.valor}`;
          const primeraVez1 = !cartasVistas.has(c1.valor);
          const primeraVez2 = !cartasVistas.has(c2.valor);

          if (!primeraVez1 || !primeraVez2) {
            setPuntos((prev) => prev - 2);
          }
          setIntentosFallidos((prev) => {
            const nuevo = { ...prev };
            nuevo[key] = (nuevo[key] || 0) + 1;
            return nuevo;
          });
        }
        setCartasVistas((prev) => new Set([...prev, c1.valor, c2.valor]));
      }
    } catch (error) {
      alert("Error al obtener el valor...");
    }
  };

  const handleMouseLeave = () => {
    if (cartasVolteadas.length === 2) {
      const [c1, c2] = cartasVolteadas;
      if (c1.valor !== c2.valor) {
        setTimeout(() => {
          setImagenes((prev) => {
            const copia = [...prev];
            copia[c1.index] = "images/tablero/Tapa.png";
            copia[c2.index] = "images/tablero/Tapa.png";
            return copia;
          });
          setCartasVolteadas([]);
        }, 500);
      }
    }
  };

  // --- Efectos ---
  useEffect(() => {
    setPuntos(0);
    setIntentosFallidos({});
  }, [tablero]);

  useEffect(() => {
    if (cartasEncontradas.length === totalCartas) {
      alert(`¡Felicidades! Has ganado con ${puntos} puntos 🎉`);
      setPuntaje(puntos);
      setGano(true);
    }
  }, [cartasEncontradas, totalCartas]);

  // --- Render ---
  if (!user) return <p>No has iniciado sesión.</p>;

  return (
    <>
      <div
        id="juego"
        className={
          filas === 3 && columnas === 4
            ? "juegoFacil"
            : filas === 4 && columnas === 5
            ? "juegoMedio"
            : "juegoDificil"
        }
      >
        {imagenes.map((src, index) => (
          <button
            key={index}
            className={`carta ${
              cartasEncontradas.includes(index) ||
              cartasVolteadas.some((c) => c.index === index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleObtenerValor(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <img src="images/tablero/Tapa.png" alt="Tapa" />
              </div>
              <div className="flip-back">
                <img src={imagenes[index]} alt="Carta" />
              </div>
            </div>
          </button>
        ))}
      </div>
      <div id="manejo-container">
        <button
          id="regresar"
          className="botones-manejo"
          onClick={handleRegresar}
        >
          Regresar
        </button>
        <button
          id="volver-jugar"
          className="botones-manejo"
          onClick={handleVolverJugar}
        >
          Volver a Jugar
        </button>
      </div>
    </>
  );
}

export default Juego;
