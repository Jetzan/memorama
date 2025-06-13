//importa el módulo de mySql2 pero la versión promesa para poder trabajar con async/await
import mysql from "mysql2/promise";

//Creamos un pool de conexiones (conjunto de conexiones listas para hacer en la base de datos)
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  //Nombre de la base de datos
  database: "memorama_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
