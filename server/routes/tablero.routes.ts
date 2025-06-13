import { Router, Request, Response, NextFunction } from "express";
import {
  generarTablero,
  obtenerValor,
} from "../controllers/tablero.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  generarTablero(req, res);
});

router.post("/valor", (req: Request, res: Response, next: NextFunction) => {
  obtenerValor(req, res);
});

export default router;
