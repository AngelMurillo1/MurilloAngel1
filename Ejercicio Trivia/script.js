function randomRango(min, max) {
    // Genera un número aleatorio entre min y max (incluidos)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarNumerosUnicos(cantidad, max) {
    // Set evita números repetidos
    const numeros = new Set();

    // Genera números hasta tener la cantidad deseada
    while (numeros.size < cantidad) {
        numeros.add(randomRango(0, max - 1)); 
    }

    // Convierte el Set en array
    return [...numeros];
}

let datos; 

async function cargarDatos() {
    // Trae el archivo JSON
    const res = await fetch("data/trivia_realista_240.json");
    datos = await res.json(); 
}

function obtenerCategoria(nombreCategoria) {
    // Busca la categoría elegida por el usuario
    return datos.categorias.find(cat => cat.nombre === nombreCategoria);
}

function seleccionarPreguntas(categoria) {
    const preguntas = categoria.preguntas;

    // Genera 5 posiciones aleatorias sin repetir
    const indices = generarNumerosUnicos(5, preguntas.length);

    // Devuelve solo esas preguntas
    return indices.map(i => preguntas[i]);
}

function mezclarArray(array) {
    // Mezcla un array (respuestas)
    return array.sort(() => Math.random() - 0.5);
}

function obtenerOpciones(pregunta) {
    // Junta correcta + incorrectas y las mezcla
    return mezclarArray([
        pregunta.correcta,
        ...pregunta.incorrectas
    ]);
}

// VARIABLES DEL JUEGO

let preguntas = []; // Guarda las 5 preguntas
let indice = 0; // En qué pregunta estamos

let correctas = 0;
let incorrectas = 0;
let noRespondidas = 0;

let tiempoRestante = 5;
let intervalo;

//INICIAR JUEGO 

document.getElementById("btn-iniciar").addEventListener("click", async () => {

    // Obtiene categoría seleccionada
    const categoriaNombre = document.getElementById("categoria").value;

    // Valida que haya elegido una
    if (!categoriaNombre) {
        alert("Elegí una categoría");
        return;
    }

    // Carga datos del JSON
    await cargarDatos();

    // Obtiene categoría y selecciona preguntas
    const categoria = obtenerCategoria(categoriaNombre);
    preguntas = seleccionarPreguntas(categoria);

    // Reinicia variables
    indice = 0;
    correctas = 0;
    incorrectas = 0;
    noRespondidas = 0;

    // Cambia de pantalla
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";

    // Muestra primera pregunta
    mostrarPregunta(preguntas[indice]);
});

// MOSTRAR PREGUNTA 

function mostrarPregunta(preguntaActual) {
    const preguntaHTML = document.getElementById("pregunta");
    const opcionesHTML = document.getElementById("opciones");
    const progresoHTML = document.getElementById("progreso");

    // Muestra progreso
    progresoHTML.textContent = `Pregunta ${indice + 1} de 5`;

    // Muestra texto de la pregunta
    preguntaHTML.textContent = preguntaActual.pregunta;

    // Limpia botones anteriores
    opcionesHTML.innerHTML = "";

    // Obtiene opciones mezcladas
    const opciones = obtenerOpciones(preguntaActual);

    // Crea botones para cada opción
    opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.textContent = opcion;

        // Evento al hacer click
        btn.addEventListener("click", () => {
            seleccionarRespuesta(opcion, preguntaActual.correcta);
        });

        opcionesHTML.appendChild(btn);
    });

    // Inicia temporizador
    iniciarTemporizador();
}

// TEMPORIZADOR

function iniciarTemporizador() {
    const tiempoHTML = document.getElementById("tiempo");

    tiempoRestante = 5;
    tiempoHTML.textContent = tiempoRestante;

    clearInterval(intervalo); // Limpia intervalos anteriores

    intervalo = setInterval(() => {
        tiempoRestante--;
        tiempoHTML.textContent = tiempoRestante;

        // Si llega a 0
        if (tiempoRestante === 0) {
            clearInterval(intervalo);
            tiempoTerminado();
        }
    }, 1000);
}

// TIEMPO TERMINADO 

function tiempoTerminado() {
    noRespondidas++; // Cuenta como no respondida

    // Bloquea botones
    const botones = document.querySelectorAll("#opciones button");
    botones.forEach(btn => btn.disabled = true);

    // Pasa a la siguiente pregunta
    setTimeout(() => {
        siguientePregunta();
    }, 1000);
}

//  RESPUESTA

function seleccionarRespuesta(seleccion, correcta) {
    clearInterval(intervalo); // Detiene el tiempo

    const botones = document.querySelectorAll("#opciones button");

    botones.forEach(btn => {
        btn.disabled = true; // Bloquea botones

        // Marca correcta
        if (btn.textContent === correcta) {
            btn.classList.add("correcta");
        }
        // Marca incorrecta elegida
        else if (btn.textContent === seleccion) {
            btn.classList.add("incorrecta");
        }
    });

    // Suma puntaje
    if (seleccion === correcta) {
        correctas++;
    } else {
        incorrectas++;
    }

    // Espera y pasa a la siguiente
    setTimeout(() => {
        siguientePregunta();
    }, 1000);
}

// SIGUIENTE PREGUNTA 

function siguientePregunta() {
    indice++; // Avanza

    if (indice < preguntas.length) {
        mostrarPregunta(preguntas[indice]);
    } else {
        mostrarResultado(); // Fin del juego
    }
}

// RESULTADO FINAL

function mostrarResultado() {

    // Cambia pantalla
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";

    // Muestra resultados
    document.getElementById("correctas").textContent = correctas;
    document.getElementById("incorrectas").textContent = incorrectas;
    document.getElementById("noRespondidas").textContent = noRespondidas;
}
