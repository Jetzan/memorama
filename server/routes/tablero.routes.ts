import { Router } from 'express';
import { generarTablero } from '../controllers/tablero.controller';

const router = Router();

router.post('/tablero', generarTablero);

export default router;
