// src/main.tsx
//React es necesario para los archviso tsx (componentes)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

//Busca el div con id "root" que esta en index.html y monta ahi la aplicacion
ReactDOM.createRoot(document.getElementById("root")!).render(
  //StrictMode es una herramienta que detecta errores
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
