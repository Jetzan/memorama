// controllers/auth.controller.ts
import { Request, Response } from 'express';

import {createTableEasy, createTableMedium, createTableHard} from '../utils/generateTable.js'

export const generarTablero = (req: Request, res: Response) => {
  const { dificultad } = req.body;

  let tablero: string[][];

  switch (dificultad) {
    case 'facil':
      tablero = createTableEasy();
      break;
    case 'medio':
      tablero = createTableMedium();
      break;
    case 'dificil':
      tablero = createTableHard();
      break;
    default:
      return res.status(400).json({ error: 'Dificultad inválida' });
  }

  return res.json({ tablero });
};
