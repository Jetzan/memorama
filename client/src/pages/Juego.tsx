// src/pages/Tablero.tsx
import { useUser } from '../context/UserContext';
import './Juego.css';

function Juego() {
  


  const { user } = useUser();

  if (!user) return <p>No has iniciado sesión.</p>;




  return (
    <>
    <div id="juego">
        <button className="carta">
          <img alt="" className="front" /><img
            className="front"
            src="images/tablero/C.png"
            alt=""
          />
          <div className="back">Voltea</div>
        </button>
        <button className="carta"><img src="images/tablero/CSharp.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Css.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Go.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Java.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Javascript.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/CPP.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Html.png" alt="" /></button>
        <button className="carta"><img src="images/tablero/Node.png" alt="" /></button>
      </div>
    </>
  );
}

export default Juego;
