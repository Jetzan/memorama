import Jugador from "./Jugador";
import Carta from "./Carta";

class Juego{
    cartas:Carta[];
    jugadorAcutal: Jugador;
    dificultad: string;






    
    constructor(cartas:Carta[],jugadorActual:Jugador, dificultad :string){
        this.cartas = cartas;
        this.jugadorAcutal = jugadorActual;
        this.dificultad = dificultad;
    }
    

}

export default Juego;