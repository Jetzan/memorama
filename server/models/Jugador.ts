class Jugador {
    nombre: string;
    puntaje: number;
    tiempo: number;

    // Sobrecargas
    constructor(nombre: string);
    constructor(nombre: string, puntaje: number, tiempo: number);

    // Implementación única
    constructor(nombre: string, puntaje?: number, tiempo?: number) {
        this.nombre = nombre;
        this.puntaje = puntaje ?? 0;
        this.tiempo = tiempo ?? 0;
    }
}

export default Jugador;
