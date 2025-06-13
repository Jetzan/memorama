import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import tableroRoutes from "./routes/tablero.routes";

const ipWifi = require("./ip");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// ✅ Agrega esta línea para que las rutas de tablero funcionen
app.use("/api/tablero", tableroRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo en http://" + ipWifi + ":3000");
});
