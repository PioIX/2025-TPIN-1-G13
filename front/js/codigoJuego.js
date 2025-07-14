let preguntaActual = null
let contadorPuntos = 0
let sumapuntos = 100
let resta = 25
let tiempo = 0
let contadorPreguntas = 0



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
    if (contadorPreguntas <= 20) {
        ui.PantallaCarga()
        let vector = await conseguirVector()
        preguntaActual = vector[0]
        console.log(preguntaActual)
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
        console.log("La respuesta es correcta")
        contadorPuntos += sumapuntos

        //ui.funciondePuntajeyCambiodeColores
    }
}