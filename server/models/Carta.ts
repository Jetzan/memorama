class Carta {
  lenguaje: string;
  volteada: boolean;
  emparejada: boolean;

  constructor(lenguaje: string) {
    this.lenguaje = lenguaje;
    this.volteada = false;
    this.emparejada = false;
  }
}

export default Carta;
