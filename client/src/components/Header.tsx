import './Header.css'
import { useUser } from "../context/UserContext";
function Header(){
   const { user } = useUser(); 
    return(
        <header>
      <div id="logo">
        <img src="images/fondoTS.png" alt="" />
      </div>
      <h1 id="nombre-empresa">Desafío Memoria</h1>
      <h2 id="dificultad">Dificultad: </h2>
      <button className="opcion-dificultad" id="dificultad-facil">FACIL</button>
      <button className="opcion-dificultad" id="dificultad-medio">MEDIO</button>
      <button className="opcion-dificultad" id="dificultad-dificil">DIFICIL</button>
      <p id="usuario"> {user? user.nombre:""}</p>
    </header>


    );
}

export default Header;