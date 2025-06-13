// src/App.tsx
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { TableroProvider } from "./context/TableroContext";
import { JugandoProvider } from "./context/JugandoContext";
import { GanoProvider } from "./context/GanoContext";
import { PuntajeProvider } from "./context/PuntajeContext";
function App() {
  return (
    <UserProvider>
      <TableroProvider>
        <JugandoProvider>
          <GanoProvider>
            <PuntajeProvider>
              <Header />
              <AppRoutes />
              <Footer />
            </PuntajeProvider>
          </GanoProvider>
        </JugandoProvider>
      </TableroProvider>
    </UserProvider>
  );
}

export default App;
