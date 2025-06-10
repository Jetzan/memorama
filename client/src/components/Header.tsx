import "./Header.css";
import { useUser } from "../context/UserContext";
import React, { useEffect, useState, useRef } from "react";
import { useTablero } from "../context/TableroContext";
import { useJugando } from "../context/JugandoContext";
import { useGano } from "../context/GanoContext";
import { fetchActualizarJugador } from "../api";
import axios from "axios";
import { usePuntaje } from "../context/PuntajeContext";

function Header() {
  const { user, setUser } = useUser();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const { tablero, setTablero } = useTablero();

  const { jugando, setJugando } = useJugando();

  const { gano } = useGano();

  const { puntaje ,setPuntaje } = usePuntaje();

  const [mostrarInfo, setMostrarInfo] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement>(null); // para detectar clics fuera

  // Escuchar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (jugando) {
      setActivo(true);
      console.log("Esta jugando");
    } else {
      setActivo(false);
    }
  }, [jugando]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setMostrarInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [activo, setActivo] = useState<boolean>(false);

  const [tiempo, setTiempo] = useState({ minutos: 0, segundos: 0 });

  useEffect(() => {
    if (!activo) return;

    const intervalo = setInterval(() => {
      setTiempo(({ minutos, segundos }) => {
        if (segundos === 59) {
          return { minutos: minutos + 1, segundos: 0 };
        } else {
          return { minutos, segundos: segundos + 1 };
        }
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [activo]);

  const [dificultadSeleccionada, setDificultadSeleccionada] = useState<
    string | null
  >(null);
  let handleClick = (nombreDificultad: string) => {
    setDificultadSeleccionada(nombreDificultad);
    setTablero(nombreDificultad); // Usa el valor directamente, no el estado
    console.log(`Dificultad seleccionada: ${nombreDificultad}`);
  };

  let actualizarDatos = async () => {
    if (!user) return;
    try {
      const apiBaseUrl = `http://${window.location.hostname}:3000`;
      // Actualiza los datos del usuario para que se muestre correctamente en el menú

      const res = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        nombre: user.nombre,
      });
      console.log("Respuesta de actualización:", res.data);
      setUser(JSON.parse(JSON.stringify(res.data.usuario)));
      console.log(
        `Nombre: ${user.nombre} TiempoFacil: ${user.tiempoFacil} Puntaje Facil: ${user.puntajeFacil} `
      );

      console.log("Datos del usuario actualizados:", res.data.usuario);
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
    }
  };

  useEffect(() => {
    if (gano) {
      let tiempoLimite = 0;

      switch (tablero) {
        case "easy":
          tiempoLimite = 60;
          break;
        case "medium":
          tiempoLimite = 90;
          break;
        case "hard":
          tiempoLimite = 120;
          break;
      }
      setPuntaje(puntaje + (tiempo.minutos * 60 + tiempo.segundos < tiempoLimite ? 100 : 0));
      console.log("Puntaje ...",puntaje)
      const totalSegundos = tiempo.minutos * 60 + tiempo.segundos;

      // Lógica para guardar puntaje aquí directamente
      const dificultadGuardar =
        tablero === "easy"
          ? "Facil"
          : tablero === "medium"
          ? "Medio"
          : "Dificil";

      const campos = {
        [`puntaje${dificultadGuardar}`]: puntaje,
        [`tiempo${dificultadGuardar}`]: totalSegundos,
      };
      setTiempo({ minutos: 0, segundos: 0 });
      setJugando(false);
      setActivo(false);

      fetchActualizarJugador(user.nombre, campos)
        .then((res) => {
          console.log(res.mensaje)
          console.log("Datos actualizados en el servidor:", campos);
          return actualizarDatos();
        })
        .catch((err) => console.error("Error actualizando jugador:", err));
    }
  }, [gano]);

  let handleClickUser = () => {
    console.log("lll");
    setMostrarInfo(true);
  };

  return (
    <header>
      <div id="logo">
        <img src="images/fondoTS.png" alt="" />
      </div>
      <h1 id="nombre-empresa">Desafío Memoria</h1>
      {user ? (
        <>
          {isMobile ? (
            <select
              id="select-dificultad"
              onChange={(e) => handleClick(e.target.value)}
            >
              <option value="easy">FÁCIL</option>
              <option value="medium">MEDIO</option>
              <option value="hard">DIFÍCIL</option>
            </select>
          ) : (
            <>
              <h2 id="dificultad">Dificultad: </h2>
              <button
                className={`opcion-dificultad ${
                  dificultadSeleccionada === "easy" ? "activo" : ""
                }`}
                id="dificultad-facil"
                onClick={() => handleClick("easy")}
                disabled={jugando}
              >
                FACIL
              </button>
              <button
                className={`opcion-dificultad ${
                  dificultadSeleccionada === "medium" ? "activo" : ""
                }`}
                id="dificultad-medio"
                onClick={() => handleClick("medium")}
                disabled={jugando}
              >
                MEDIO
              </button>
              <button
                className={`opcion-dificultad ${
                  dificultadSeleccionada === "hard" ? "activo" : ""
                }`}
                id="dificultad-dificil"
                onClick={() => handleClick("hard")}
                disabled={jugando}
              >
                DIFICIL
              </button>
            </>
          )}

          <span id="cronometro">
            {(tiempo.minutos > 9 ? tiempo.minutos : "0" + tiempo.minutos) +
              " : " +
              (tiempo.segundos > 9 ? tiempo.segundos : "0" + tiempo.segundos)}
          </span>

          <div
            id="user-back"
            ref={userMenuRef}
            onClick={() => handleClickUser()}
          >
            <i className="fa-solid fa-user fa-2x" id="usuario-info"></i>

            <div
              id="info-desplegable"
              className={mostrarInfo ? "ver" : "ocultar"}
            >
              <div id="user-name-menu">
                <i className="fa-solid fa-user fa-2x" id="icon-menu"></i>
                <p id="USER-menu">USER: </p>
                <p id="name-menu">{user.nombre} </p>
              </div>

              <p className="title-div">Puntajes</p>
              <div className="info-div">
                Acutal: <br />
                Facil: {user.puntajeFacil}
                <br />
                Medio: {user.puntajeMedio}
                <br />
                Dificil: {user.puntajeDificil}
                <br />
              </div>
              <p className="title-div">Tiempo</p>
              <div className="info-div">
                Actual: <br />
                Facil: {user.tiempoFacil}
                <br />
                Medio: {user.tiempoMedio}
                <br />
                Dificil: {user.tiempoDificil}
                <br />
              </div>
              <p className="title-div">Record</p>
              <div className="info-div">
                Mejor puntaje: <br />
                Mejor tiempo: <br />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}

export default Header;
