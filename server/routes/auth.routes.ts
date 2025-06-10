import { Router, Request, Response, NextFunction } from 'express';
import { loginOrRegister,actualizarJugador } from '../controllers/auth.controller';


//Se crea una isntrancia de Router 
const router = Router();


//Cuando el usuario haga un post en /login
//req es el objeto que contiene lo que envio el usuario
//res es la respuesta que se le enviara al usuario 
//next sirve para pasar errores o continuar con el siguiente middleware 
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  loginOrRegister(req, res).catch(next);
});

router.put('/actualizar', (req: Request, res: Response, next: NextFunction) => {
  actualizarJugador(req, res).catch(next);
});


export default router;
