import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';


const ipWifi = require('./ip');


//Crea una instancia de la aplicacion Express 
const app = express();

//El middleware permite que el frontend haga solicitudes al backend sin ser bloqueado por el navegador
app.use(cors());

//Transforma el cuerpo de las solicitudes en formato json
//Para poder leer los datos desde req.body
app.use(express.json());

//Todas las rutas que comiencen con /api/auth seran manejadas por el archivo authRoutes 
app.use('/api/auth', authRoutes);


//La aplicacion eschuchara en el puerto 3000
app.listen(3000,'0.0.0.0', () => {
  console.log('Servidor corriendo en http://'+ipWifi+':3000');
});
