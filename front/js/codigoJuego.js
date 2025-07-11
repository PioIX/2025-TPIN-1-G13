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
    return result
}

let preguntaActual = null

async function juegoCarga() {
    ui.PantallaCarga()
    let vector = await conseguirVector()
    preguntaActual = vector[0]
    console.log(preguntaActual)
    let categoria = vector[1]
    console.log("Pregunta: ", preguntaActual, "- Categoria: ", categoria)
    await new Promise(resolve => setTimeout(resolve, 1650))
    ui.rellenarPrePregunta(categoria)
}

// Esta funcion aun no funciona pq las preguntas no tienen imagen. Hacer mañana
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
        // A partir de aca seguir la comprobacion
        return result
    } catch (error) {
        console.log(error)
    }
}

async function PreguntasJuego() {
    console.log(preguntaActual)
    let id = await conseguirIdPregunta(preguntaActual)
    let respuestas = await conseguirRespuestasEspecificas(id)
    console.log("id: ", id, "  respuestas: ", respuestas)
    // let imagen = await corroborarImagenEnPregunta(preguntaActual)
    // ui.rellenarPregunta(preguntaActual, imagen)
}