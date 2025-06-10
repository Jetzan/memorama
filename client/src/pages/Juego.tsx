import { useUser } from "../context/UserContext";
import "./Juego.css";
import { fetchObtenerValor } from "../api";
import { useTablero } from "../context/TableroContext";
import { useState, useEffect } from "react";
import { useGano } from "../context/GanoContext";
import { usePuntaje } from "../context/PuntajeContext";


function Juego() {
  const { tablero } = useTablero();
  const { user } = useUser();

  const { gano, setGano } = useGano();

  const [puntos, setPuntos] = useState(0);
  const { setPuntaje } = usePuntaje();

  const [intentosFallidos, setIntentosFallidos] = useState<{
    [key: string]: number;
  }>({});
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());

  if (!user) return <p>No has iniciado sesión.</p>;

  let filas = 3,
    columnas = 4;
  switch (tablero) {
    case "easy":
      filas = 3;
      columnas = 4;
      break;
    case "medium":
      filas = 4;
      columnas = 5;
      break;
    case "hard":
      filas = 4;
      columnas = 7;
      break;
  }
  useEffect(() => {
    setPuntos(0);
    setIntentosFallidos({});
    setTiempoInicio(Date.now());
  }, [tablero]);

  const totalCartas = filas * columnas;
  const [imagenes, setImagenes] = useState<string[]>(
    Array(totalCartas).fill("images/tablero/Tapa.png")
  );
  const [cartasVolteadas, setCartasVolteadas] = useState<
    { index: number; valor: string }[]
  >([]);
  const [cartasEncontradas, setCartasEncontradas] = useState<number[]>([]);

  const obtenerFilaColumna = (index: number) => {
    const fila = Math.floor(index / columnas);
    const columna = index % columnas;
    return { fila, columna };
  };

  const handleObtenerValor = async (index: number) => {
    // si ya está descubierta, no hacer nada
    if (
      cartasVolteadas.some((c) => c.index === index) ||
      cartasEncontradas.includes(index)
    )
      return;

    const { fila, columna } = obtenerFilaColumna(index);

    try {
      const res = await fetchObtenerValor(fila, columna);
      const valor = res.valor; // usa valor.valor

      // Mostrar carta
      setImagenes((prev) => {
        const copia = [...prev];
        copia[index] = `images/tablero/${valor}.png`;
        return copia;
      });

      const nuevaCarta = { index, valor };
      const nuevasCartas = [...cartasVolteadas, nuevaCarta];

      setCartasVolteadas(nuevasCartas);

      // Si son 2 cartas, verificar si coinciden
      if (nuevasCartas.length === 2) {
        if (nuevasCartas.length === 2) {
          const [c1, c2] = nuevasCartas;

          if (c1.valor === c2.valor) {
            // ✅ Par correcto
            setCartasEncontradas((prev) => [...prev, c1.index, c2.index]);
            setCartasVolteadas([]);
            setPuntos((prev) => prev + 10);
          } else {
            // ❌ Par incorrecto
            const key = `${c1.valor}-${c2.valor}`;

            // No penalizar si es la primera vez que se ven estas cartas
            const primeraVez1 = !Object.values(intentosFallidos).some(
              (v) => v === c1.valor
            );
            const primeraVez2 = !Object.values(intentosFallidos).some(
              (v) => v === c2.valor
            );

            if (!primeraVez1 || !primeraVez2) {
              // Ya se habían equivocado antes con estas cartas
              setPuntos((prev) => prev - 2);
            }

            // Registrar intento fallido
            setIntentosFallidos((prev) => {
              const nuevo = { ...prev };
              nuevo[key] = (nuevo[key] || 0) + 1;
              return nuevo;
            });
          }
        }
      }
    } catch (error) {
      alert("Error al obtener el valor...");
    }
  };
  useEffect(() => {
    if (cartasEncontradas.length === totalCartas) {
     
      

      console.log("Gano con puntos:", puntos);
      alert(
        `¡Felicidades! Has ganado con ${puntos
        } puntos 🎉`
      );
      setGano(true);
    }
  }, [cartasEncontradas, totalCartas]);

  const handleMouseLeave = () => {
    if (cartasVolteadas.length === 2) {
      const [c1, c2] = cartasVolteadas;

      if (c1.valor !== c2.valor) {
        // Voltear de nuevo
        setImagenes((prev) => {
          const copia = [...prev];
          copia[c1.index] = "images/tablero/Tapa.png";
          copia[c2.index] = "images/tablero/Tapa.png";
          return copia;
        });

        setCartasVolteadas([]); // limpiar selección
      }
    }
  };

  useEffect(() => {
    if (cartasEncontradas.length === totalCartas) {
      alert("¡Felicidades! Has encontrado todos los pares 🎉");
      setPuntaje(puntos);
      setGano(true);
    }
  }, [cartasEncontradas, totalCartas]);

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
    </>
  );
}

export default Juego;
