class Carta{
    constructor(emoji){
        this.emoji = emoji;
        this.estado = "oculta"; // visible o resuelta
    }
}


const emojis = [
  "🎮","🕹️","👾","🎲","🃏","♟️","🎯","🏆","🥇","🔥",
  "⚡","💣","🧨","🔫","🗡️","⚔️","🛡️","🏹","🪓","⛏️",
  "👑","💎","🎱","📦","🎁","🚀","🛸","🌌","🌠","🪐",
  "🐉","🦖","🦕","🐺","🦊","🐯","🦁","🦂","🐍","🕷️",
  "👻","💀","☠️","👽","🤖","🎃","😈","🧟","🧙","🦸"
];


class Juego{
    constructor(){
        this.cartas = [];
        this.turno = 0;
        this.cartasSeleccionadas = [];
        this.iniciarJuego();
    }
    async iniciarJuego(){
        await this.inicializarCartas();
        this.mezclarCartas();
        this.renderizarTablero();
    }

    async inicializarCartas(){
    this.cartas = [];

    // Mezclar emojis
    const emojisMezclados = [...emojis].sort(() => Math.random() - 0.5);

    // Elegir 10 (para 20 cartas)
    const seleccionados = emojisMezclados.slice(0, 50);

    // Crear pares
    seleccionados.forEach(emoji => {
        this.cartas.push(new Carta(emoji));
        this.cartas.push(new Carta(emoji));
    });
}

    mezclarCartas(){
        for(let i = this.cartas.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    renderizarTablero(){
        const tablero = document.getElementById('tablero');
        tablero.innerHTML = '';

        this.cartas.forEach((carta, index) => {
            const cartaElement = document.createElement('div');
            cartaElement.classList.add('carta');

            cartaElement.textContent = carta.estado !== 'oculta' ? carta.emoji : '';

            if(carta.estado === 'visible'){
                cartaElement.classList.add('visible');
            } else if(carta.estado === 'resuelta'){
                cartaElement.classList.add('resuelta');
            }
            cartaElement.addEventListener('click', () => this.seleccionarCarta(index));
            tablero.appendChild(cartaElement);
        });

        document.getElementById('turnos').textContent = `${this.turno}`;
    }

    seleccionarCarta(index){
        const carta = this.cartas[index];

        if(
            carta.estado === 'resuelta' ||
            carta.estado === 'visible' ||
            this.cartasSeleccionadas.length === 2
        ){
            return;
        }
        carta.estado = 'visible';
        this.cartasSeleccionadas.push(carta);

        this.renderizarTablero();

        if(this.cartasSeleccionadas.length === 2){
            this.turno++;

            setTimeout(() => {
                this.verificarSeleccion();
            }, 800);
        }
    }

    verificarSeleccion(){
        const [carta1, carta2] = this.cartasSeleccionadas;

        if(carta1.emoji === carta2.emoji){
            carta1.estado = 'resuelta';
            carta2.estado = 'resuelta';
        } else {
            carta1.estado = 'oculta';
            carta2.estado = 'oculta';
        }
        this.cartasSeleccionadas = [];
        this.renderizarTablero();

        this.verificarVictoria();
    }

    verificarVictoria(){
    const todasResueltas = this.cartas.every(c => c.estado === 'resuelta');

    if(todasResueltas){
        setTimeout(() => {
            const mensaje = document.getElementById('victoria');
            mensaje.style.display = 'block';

            // Mostrar botón
            document.getElementById('reiniciar').style.display = 'block';
        }, 300);
    }
    }

    reiniciarJuego(){
    this.cartas = [];
    this.turno = 0;
    this.cartasSeleccionadas = [];

    document.getElementById('victoria').style.display = 'none';
    document.getElementById('reiniciar').style.display = 'none';

    this.iniciarJuego();
    }
}

const juego = new Juego();

document.getElementById('reiniciar').addEventListener('click', () => {
    juego.reiniciarJuego();
});