// src/context/UserContext.tsx
//Un contexto en React te permite compartir variable sglobales
import { createContext, useState, useContext } from 'react';


//El contexto es necesario para que desde el componente "Tablero" tenga acceso al nombre del usuario que hizo login
//y poder mostrarlo en la pagina

//Crea el contexto del usuario 
export const UserContext = createContext<any>(null);



export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //Crea un estado para el usuario , (para tener los valores en tiempo real en  cualquier pagina)
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//Exporta el contexto del usuario 
export const useUser = () => useContext(UserContext);
