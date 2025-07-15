let preguntaActual = null
let contadorPuntos = 0
let sumapuntos = 100
let resta = 25
let tiempoPartida = 0
let contadorPreguntas = 0
let preguntasYaSeleccionadas = []


async function conseguirCategorias() {
    const response = await fetch(`http://localhost:4006/categorias`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    let result = await response.json()
    return result
}

async function conseguirPreguntasDeCategoria(categoriaSeleccionada) {
    try {
        const response = await fetch(`http://localhost:4006/preguntaResponder`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({categoria: categoriaSeleccionada})
        })
        let result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

async function conseguirVector() {
    let result = []
    let categorias = await conseguirCategorias()
    let categoriaSeleccionada = categorias[Math.floor(Math.random() * categorias.length)].categoria; // se consigue el valor de la categoria
    let preguntasCategoria = await conseguirPreguntasDeCategoria(categoriaSeleccionada)
    let preguntaSeleccionada = preguntasCategoria[Math.floor(Math.random() * preguntasCategoria.length)].pregunta; // se consigue el valor de la pregunta
    result.push(preguntaSeleccionada, categoriaSeleccionada)
    contadorPreguntas += 1
    sumapuntos = 100
    return result
}



async function juegoCarga() {
    document.getElementById("preguntaResponder").style.display = 'none';
    if (contadorPreguntas <= 20) {
        ui.PantallaCarga()
        let vector = await conseguirVector()
        preguntaActual = vector[0]
        console.log(preguntaActual)
        let id = await conseguirIdPregunta(preguntaActual)
        for (let i = 0; i < preguntasYaSeleccionadas.length; i++) {
            if (preguntasYaSeleccionadas[i] == id) {
                console.log("Esta pregunta ya fue seleccionada")
                juegoCarga()
            }
        }
        preguntasYaSeleccionadas.push(id)
        let categoria = vector[1]
        console.log("Pregunta: ", preguntaActual, "- Categoria: ", categoria)
        await new Promise(resolve => setTimeout(resolve, 4750))
        ui.rellenarPrePregunta(categoria)
    } else {
        console.log("finaliza el juego")
        // ui.final()
    }
}

async function corroborarImagenEnPregunta(preguntaActual) {
    try {
        const response = await fetch(`http://localhost:4006/preguntaImagen`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({pregunta: preguntaActual})
        })
        let result = await response.json()
        if (result != null) {
            return result[0].imagen
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error)
    }
}

async function PreguntasJuego() {
    let id = await conseguirIdPregunta(preguntaActual)
    let respuestas = await conseguirRespuestasEspecificas(id)
    let imagen = await corroborarImagenEnPregunta(preguntaActual)
    console.log("id: ", id, "  respuestas: ", respuestas, "  Ruta Imagen: ", imagen)
    ui.rellenarPregunta(preguntaActual, respuestas, imagen)
}


async function verificacion(respuestaSeleccionada) {
    let id = await conseguirIdPregunta(preguntaActual)

    const response = await fetch(`http://localhost:4006/verificacionRespuesta`, {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({respuesta: respuestaSeleccionada, id_pregunta: id})
    })
    let result = await response.json()
    console.log("¿Es correcto?: ", result)
    return result
}

async function VerificarRespuesta(boton) {
    let respuestaSeleccionada = boton.innerText;
    console.log("Se apretó:", respuestaSeleccionada);
    let result = await verificacion(respuestaSeleccionada)
    if (result[0].correcta === 0) {
        console.log("La respuesta es incorrecta")
        sumapuntos -= resta
        //ui.funciondePuntajeyCambiodeColores
    } else {
        ui.deshabilitarRespuestasCorrectas()
        respondido = true
        clearInterval(timerInterval)
        let barra = document.getElementById("barra-timer");
        if (barra) barra.style.display = "none";
        console.log("La respuesta es correcta")
        contadorPuntos += sumapuntos

        //ui.funciondePuntajeyCambiodeColores
    }
}

let timerInterval;
let tiempoTotal = 10; // segundos
let tiempoRestante = tiempoTotal;
let respondido = false;

function iniciarTimer() {
    const barra = document.getElementById("barra-interna");
    tiempoRestante = tiempoTotal;
    respondido = false;

    barra.style.width = "100%";
    barra.style.backgroundColor = "#27ae60"; // verde inicial

    timerInterval = setInterval(() => {
        tiempoRestante--;

        let porcentaje = (tiempoRestante / tiempoTotal) * 100;
        barra.style.width = porcentaje + "%";

        // Cambiar color según tiempo
        if (tiempoRestante <= 3) {
            barra.style.backgroundColor = "#e74c3c"; // rojo
        } else if (tiempoRestante <= 6) {
            barra.style.backgroundColor = "#f1c40f"; // amarillo
        }

        // Si se acabó el tiempo
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            if (!respondido) {
                document.getElementById("preguntaResponder").innerHTML += `
                    <div class="mensajeTiempo">⏰ ¡Se acabó el tiempo!</div>
                `;
                ui.deshabilitarRespuestas();
            }
        }
    }, 1000);
}