class Jugador {
  nombre: string;
  tiempoFacil: number = 0;
  tiempoMedio: number = 0;
  tiempoDificil: number = 0;
  puntajeFacil: number = 0;
  puntajeMedio: number = 0;
  puntajeDificil: number = 0;

  constructor(
    nombre: string,
    tiempoFacil?: number,
    tiempoMedio?: number,
    tiempoDificil?: number,
    puntajeFacil?: number,
    puntajeMedio?: number,
    puntajeDificil?: number
  ) {
    this.nombre = nombre;
    this.tiempoFacil = tiempoFacil ?? 0;
    this.tiempoMedio = tiempoMedio ?? 0;
    this.tiempoDificil = tiempoDificil ?? 0;
    this.puntajeFacil = puntajeFacil ?? 0;
    this.puntajeMedio = puntajeMedio ?? 0;
    this.puntajeDificil = puntajeDificil ?? 0;
  }
}

export default Jugador;
