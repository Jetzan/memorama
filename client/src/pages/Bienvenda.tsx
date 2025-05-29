import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import './Bienvenida.css';


function Bienvenida() {
    const { user } = useUser()
    const navigate = useNavigate();

  let handleCLick = () => {
    try{
      
        navigate("/juego");
    }catch{
        console.log("No existe el componente Juego")
    }
  };
  return (
    <>
      <main id="main-bienvenida">
        <div id="bienvenida">
        <img src="./images/fondoBienvenido.png" alt="" />
          <button id="button-inicio" onClick={handleCLick}>INICIO</button>
        </div>
      </main>
    </>
  );
}

export default Bienvenida;
