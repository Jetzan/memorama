// src/App.tsx
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';

import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <UserProvider>
      <Header />
      <AppRoutes />
      <Footer />
    </UserProvider>
  );
}

export default App;
