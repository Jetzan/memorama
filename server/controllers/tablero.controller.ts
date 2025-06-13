// controllers/tablero.controller.ts
import { Request, Response } from "express";
import {
  createTableEasy,
  createTableMedium,
  createTableHard,
  getValueInTable,
} from "../utils/generateTable";

let tableroActual: string[][] | null = null; // Se guarda en memoria

export const generarTablero = (req: Request, res: Response) => {
  const { dificultad } = req.body;

  switch (dificultad) {
    case "easy":
      tableroActual = createTableEasy();
      break;
    case "medium":
      tableroActual = createTableMedium();
      break;
    case "hard":
      tableroActual = createTableHard();
      break;
    default:
      return res.status(400).json({ error: "Dificultad no válida" });
  }

  return res.json({ message: "Tablero generado correctamente" });
};

export const obtenerValor = (req: Request, res: Response) => {
  const { x, y } = req.body;
  if (!tableroActual) {
    return res.status(400).json({ error: "No hay tablero generado aún" });
  }

  if (
    x < 0 ||
    y < 0 ||
    x >= tableroActual.length ||
    y >= tableroActual[0].length
  ) {
    return res.status(400).json({ error: "Coordenadas fuera de rango" });
  }

  const valor = getValueInTable(tableroActual, x, y);
  return res.json({ valor });
};
