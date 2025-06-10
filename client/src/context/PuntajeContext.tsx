//Un contexto en React te permite compartir variable sglobales
import { createContext, useState, useContext } from 'react';

//El contexto es necesario para que desde el componente "Puntaje" tenga acceso al nombre del usuario que hizo login
//y poder mostrarlo en la pagina

//Crea el contexto del usuario 
export const PuntajeContext = createContext<any>(0);




export const PuntajeProvider = ({ children }: { children: React.ReactNode }) => {
  //Crea un estado para el usuario , (para tener los valores en tiempo real en  cualquier pagina)
  const [puntaje, setPuntaje] = useState(false);
  return (
    <PuntajeContext.Provider value={{ puntaje, setPuntaje }}>
      {children}
    </PuntajeContext.Provider>
  );
};

//Exporta el contexto del usuario 
export const usePuntaje = () => useContext(PuntajeContext);
