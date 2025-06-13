//Un contexto en React te permite compartir variable sglobales
import { createContext, useState, useContext } from "react";

//El contexto es necesario para que desde el componente "Gano" tenga acceso al nombre del usuario que hizo login
//y poder mostrarlo en la pagina

//Crea el contexto del usuario
export const GanoContext = createContext<any>(null);

export const GanoProvider = ({ children }: { children: React.ReactNode }) => {
  //Crea un estado para el usuario , (para tener los valores en tiempo real en  cualquier pagina)
  const [gano, setGano] = useState(false);
  return (
    <GanoContext.Provider value={{ gano, setGano }}>
      {children}
    </GanoContext.Provider>
  );
};

//Exporta el contexto del usuario
export const useGano = () => useContext(GanoContext);
