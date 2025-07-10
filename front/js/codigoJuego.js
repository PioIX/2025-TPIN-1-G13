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
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

async function conseguirPreguntaResponder() {
    let categorias = await conseguirCategorias()
    let categoriaSeleccionada = categorias[Math.floor(Math.random() * categorias.length)].categoria; // se consigue el valor de la categoria
    let preguntasCategoria = await conseguirPreguntasDeCategoria(categoriaSeleccionada)
    let preguntaSeleccionada = preguntasCategoria[Math.floor(Math.random() * preguntasCategoria.length)].pregunta; // se consigue el valor de la pregunta
    return preguntaSeleccionada
}


async function juego() {
    let pregunta = await conseguirPreguntaResponder()
    console.log(pregunta)
}