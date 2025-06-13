//Un contexto en React te permite compartir variable sglobales
import { createContext, useState, useContext } from "react";

//El contexto es necesario para que desde el componente "Jugando" tenga acceso al nombre del usuario que hizo login
//y poder mostrarlo en la pagina

//Crea el contexto del usuario
export const JugandoContext = createContext<any>(null);

export const JugandoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //Crea un estado para el usuario , (para tener los valores en tiempo real en  cualquier pagina)
  const [jugando, setJugando] = useState(false);
  return (
    <JugandoContext.Provider value={{ jugando, setJugando }}>
      {children}
    </JugandoContext.Provider>
  );
};

//Exporta el contexto del usuario
export const useJugando = () => useContext(JugandoContext);
