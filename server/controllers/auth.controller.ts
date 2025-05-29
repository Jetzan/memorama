import { Request, Response } from 'express';
//pool es la conexion a la base de datos
import { pool } from '../db';

import Jugador from '../models/Jugador';






//Define el tipo de datos que se esperan en req.body en este caso solo un string
interface LoginRequestBody {
  nombre: string;
}

//Funcion acincrona que maneja el login y el registro en una sola ruta
//Express le pasa req y res 
export const loginOrRegister = async (
  //req.body trae el nombre desde el frontend
  req: Request<{}, {}, LoginRequestBody>,
  //Responde con un json
  res: Response
) => {
  //Obtenemos el nombre del cuerpo de la peticion
  const { nombre } = req.body;
  //Si no se proporciona un nombre se respone con un error 400
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });

  //Maneja una EXCEPTION 
  try {
    //Se hace una consulta a la base de datos para ver si el usuario ya existe en la tabla usuarios 
    const [rows]: any = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);

    //Si existe se devuelve un mensaje de "Bienvenido "
    if (rows.length > 0) {
      // Usuario existe
      return res.json({ mensaje: 'Bienvenido', usuario: rows[0] });
    } else {
      //Si no existe lo crea 
      // Registrar nuevo usuario con puntaje 0
      await pool.query('INSERT INTO usuarios (nombre, puntaje, tiempo) VALUES (?, ?, ?)', [nombre, 0,0]);
      //Despues de crearlo lo busca en la base de datos y lo selecciona
      //Para despues mostrar un mensaje de "Usuario registrado"
      const [nuevo]: any = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);

      const jugador = new Jugador(rows[0].nombre, rows[0].puntaje, rows[0].tiempo);
      return res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevo[0] });
    }

      

  } catch (error) {
    //Si algo falla (como la conexion a mySql) se imprime un error en la consola
  console.error('Error en loginOrRegister:', error);
  return res.status(500).json({ error: 'Error en el servidor' });
}

  
};


