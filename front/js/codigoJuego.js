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

async function juego() {
    let categorias = await conseguirCategorias()

}