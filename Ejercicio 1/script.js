// Juego de memoria y suma: muestra números con intervalo y solicita la suma total.

let numeros = [];
let sumaTotal = 0;

function generarNumeros() {
    reiniciarJuego(); // Reinicia el juego antes de generar nuevos números

    // Desactivar botón
    document.getElementById('btnGenerar').disabled = true;
    document.getElementById('btnVerificar').disabled = true;

    do {
        numeros = [];
        sumaTotal = 0;

        while (numeros.length < 5) {
            let numero = Math.floor(Math.random() * 21) - 10; // -10 a 10

            if (!numeros.includes(numero)) {
                numeros.push(numero);
                sumaTotal += numero;
            }
        }

    } while (sumaTotal < 0); // Repite todo si la suma es negativa

    mostrarNumeros();
}

function mostrarNumeros(){
    const contenedor = document.getElementById('numeros');
    contenedor.innerHTML = '';

    let i = 0;

    let intervalo = setInterval(() => {
        if (i < numeros.length) {
            contenedor.innerHTML = `<div class="numero">${numeros[i]}</div>`;
            i++;
        } else {
            clearInterval(intervalo);

            // Borra los números después de 1 segundo de mostrar el último
            setTimeout(() => {
                contenedor.innerHTML = '';

                // Activar botón nuevamente
                document.getElementById('btnGenerar').disabled = false;
                document.getElementById('btnVerificar').disabled = false;
            }, 1000);
        }
    }, 1000);
}

function verificarSuma() {
    const respuesta = parseInt(document.getElementById('respuesta').value);

    // Validar que no sea negativa
    if (respuesta < 0) {
        document.getElementById('resultado').innerHTML = 'La respuesta no puede ser negativa';
        return;
    }

    if (respuesta === sumaTotal) {
        document.getElementById('resultado').innerHTML = '¡Correcto! La suma es ' + sumaTotal;
    } else {
        document.getElementById('resultado').innerHTML = '¡Incorrecto! La suma es ' + sumaTotal;
    }
}

function reiniciarJuego() {
    numeros = [];
    sumaTotal = 0;

    // Limpiar pantalla de números
    document.getElementById('numeros').innerHTML = '';

    // Limpiar input
    document.getElementById('respuesta').value = '';

    // Limpiar resultado
    document.getElementById('resultado').innerHTML = '';

    document.getElementById('btnVerificar').disabled = true;
}


