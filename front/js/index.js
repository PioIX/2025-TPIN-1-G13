// Punto 1

async function traerClubes() {
    let response
    response = await fetch(`http://localhost:4000/clubes`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },

    })
    const clubes = await response.json();
    console.log(clubes)

    let tabla = ""
    for (let i = 0; i < clubes.length; i++) {
        tabla += `
            <tr>
                <td> ${clubes[i].nombre} </td>
                <td> ${clubes[i].cant_jugadores}</td>
                <td> ${clubes[i].tiene_colegio} </td>
                <td> ${clubes[i].id_club} </td>
                <td> ${clubes[i].año_fundacion} </td>
                <td> ${clubes[i].id_estadio} </td> 
            </tr>`
    }
    if (document.getElementById("Tabla") != undefined) {
        document.getElementById("Tabla").innerHTML += tabla;
    }
    else{
        return clubes
    }


}    

// Punto 2

async function postClub(datos) {
    let response
    response = await fetch(`http://localhost:4000/insertarclub`, {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    console.log(response)
    let result = await response.json()
    console.log(result)
}

function obtenerDatos() {
    let datos = {
        id_club: getIdClub(),
        cant_jugadores: getCantidadJugadores(),
        tiene_colegio: getTieneColegio(),
        año_fundacion: getAñoFundacion(),
        id_estadio: getIdEstadio(),
        nombre: getNombre(),
    }
    console.log(datos)
    postClub(datos)
}

// Punto 3

async function EliminarClub(id) {
    let response
    response = await fetch(`http://localhost:4000/clubdelete`, {
        method: "DELETE", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_club: id})
    })
    console.log(response)
    let result = await response.json()
    console.log(result)
}

async function llenarSelect() {
    let clubes = await traerClubes()
    console.log(clubes)
    let select = ``

    for (let i = 0; i < clubes.length; i++) {
        select += `<option value="${clubes[i].id_club}">${clubes[i].id_club}</option>`
    }

    document.getElementById("select").innerHTML += select
}
// 2

function ObtenerId() {
    let id = getId()
    EliminarClub(id)
}

// Punto 4

async function fetchModificarClub(id_club,cant_nueva) {
    let response = await fetch("http://localhost:4000/clubesput",
        {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ cant_jugadores: cant_nueva,id_club: id_club }) //El paremetro se tiene que llamar como lo espera el back en el body
        })
    let result = response.json()
    return result
}

async function llenarSelectclub() {
    let clubes = await traerClubes()

    let selectClub = ``
    for (let i = 0; i < clubes.length; i++) {
        selectClub += `<option>${clubes[i].cant_jugadores}</option>`
    }

    let select = ``
    for (let i = 0; i < clubes.length; i++) {
        select += `<option>${clubes[i].id_club}</option>`
    }
    document.getElementById("selectClub").innerHTML += selectClub
    document.getElementById("select").innerHTML += select
}

async function modificar() {
    let id_club = getId()
    let cant_nueva = getCantNueva()
    let respuesta = await fetchModificarClub(id_club,cant_nueva)
    return
}



async function fetchNombre(nombre) {
    let response
    response = await fetch(`http://localhost:4000/login`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: nombre})
    })
    console.log(response)
    let result = await response.json()
    console.log(result)
}


function envioUsuario() {
    let nombre
    nombre = getNombre()
    fetchNombre(nombre)
}

// -------------------------------------------------------------------------------TP MITAD DE AÑO-------------------------------------------


let idLogged = -1  

// LOGIN  !!!!!!!!!!!
async function existsUser (nombre,password) { 
    try {
        const respuesta = await fetch(`http://localhost:4006/usuarioExiste`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: nombre, contraseña: password}),    
        })
        let result = await respuesta.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

async function existsUserRegister(nombre) { 
    try {
        const respuesta = await fetch(`http://localhost:4006/usuarioExisteRegistro`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: nombre}),    
        })
        let result = await respuesta.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

async function conseguirID(nombre) {
    try {
        const respuesta = await fetch(`http://localhost:4006/conseguirId`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: nombre})
    
        })
        let result = await respuesta.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

async function esAdmin(nombre) {
    try {
        const respuesta = await fetch(`http://localhost:4006/esAdmin`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: nombre})
    
        })
        let result = await respuesta.json()
        console.log(result)
        if (result.length > 0) {
            return result[0].es_admin; // ✅ devolvemos solo el número
        } else {
            return null; // o null, según cómo quieras manejar errores
        }
    } catch (error) {
        console.log(error)
    }
}

async function login() {
    try {
        let nombre = ui.getUser(); 
        let password = ui.getPassword();
        let resultado = await existsUser(nombre, password) 
        console.log(resultado)
        if (resultado.length > 0) {  // SEGUIR SISTEMA DE LENGHT PARA USUARIOS
            idLogged = await conseguirID(nombre);
            console.log(idLogged)
            let admin = await esAdmin(nombre)
            console.log(admin)
            if (admin > 0) {
                ui.clearLoginInputs()
                ui.clearAgregarPreguntasyRespuestasInputs()
                ui.clearEditarPreguntaoRespuestasInputs()
                ui.clearEditarPuntajeInputs()
                ui.clearSelectsEliminarUsuarioyEliminarPregunta()
                ui.changeScreenAdmin()
            } else {
                ui.clearLoginInputs()
                ui.changeScreen()
            }
        } else {
            ui.clearLoginInputs()
            ui.showModal("Usuario o contraseña son incorrectos")
            idLogged = -1;
        }
    } catch (error) {
        console.log(error)
    }
}

// REGISTER !!!!!!!!!!!!

async function conseguirDatos(nombre, password) {
    try {
        let datos = {
            usuario: nombre,
            contraseña: password,
            puntaje: 0,
            tiempo: 0,
            es_admin: 0
        }
        console.log(datos)
        return datos
    } catch (error) {
        console.log(error)
    }
}

async function newuser(nombre, password) {
    try {
        let resultado = await existsUserRegister(nombre)
        console.log(resultado)
        if (resultado.length == 0) {
                console.log("hola")
                let datos = await conseguirDatos(nombre, password)
                const response = await fetch(`http://localhost:4006/insertarUsuario`, {
                    method: "POST", //GET, POST, PUT o DELETE
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datos)
            })
            let result = await response.json()
            console.log(result)
            return 1
        } else {
                return -1;
            }
    } catch (error) {
        console.log(error)
    }
}
            
async function registrar() {
    try {
        let nombre = ui.getUser();
        let password = ui.getPassword()
        console.log(nombre, password)
        let creado = await newuser(nombre, password)
        if (creado > 0) {
            ui.clearLoginInputs()
            ui.showModal("Usuario creado, haga el login por favor")
        } else {
            ui.clearLoginInputs()
            ui.showModal("Usuario existente, cree uno con distinto usuario porfavor")
        }
    } catch (error) {
        console.log(error)
    }
}

// PREGUNTAS

async function datosPregunta() {
    let datos = {
        pregunta: ui.getPregunta(),
        categoria: ui.getCategoria(),
        imagen: ui.getImagen()
    }
    return datos
}

async function postPregunta() {
    let datos = await datosPregunta()
    console.log(datos)
    const response = await fetch(`http://localhost:4006/subirPregunta`, {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    let result = await response.json()
    console.log(result)
    ui.showModal("Pregunta subida con éxito")
}

async function conseguirIdPregunta(pregunta) {
    const response = await fetch(`http://localhost:4006/conseguirIdPregunta`, {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({pregunta: pregunta})
    })
    let result = await response.json()
    console.log(result)
    if (result.length > 0) {
        return result[0].id_pregunta; // ✅ devolvemos solo el número
    } else {
        return -1; // o null, según cómo quieras manejar errores
    }
}


async function datosRespuesta() {
    let pregunta = ui.getPregunta();
    let id_pregunta = await conseguirIdPregunta(pregunta);

    let respuestas = [];

    for (let i = 1; i <= 4; i++) {
        // ID del input de texto
        let inputTexto = document.getElementById(`opcion${i === 1 ? "Uno" : i === 2 ? "Dos" : i === 3 ? "Tres" : "Cuatro"}`);
        let inputCheckbox = document.getElementById(`opcion${i}`);

        // Validamos que haya algo escrito
        if (inputTexto.value.trim() !== "") {
            respuestas.push({
                id_pregunta: id_pregunta,
                correcta: inputCheckbox.checked,
                respuesta: inputTexto.value.trim()
            });
        }
    }

    return respuestas;
}



async function postRespuestas() {
        let respuestas = await datosRespuesta();
    
        for (let respuesta of respuestas) {
            const response = await fetch("http://localhost:4006/subirRespuesta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(respuesta)
            });
    
            let result = await response.json();
            console.log("Respuesta subida:", result);
        }
        ui.clearAgregarPreguntasyRespuestasInputs()
        ui.showModal("Respuestas subidas con éxito - Vinculadas a la pregunta");
} 


async function conseguirPregunta(){
    const response = await fetch(`http://localhost:4006/preguntas`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    let result = await response.json()
    return result
}



async function eliminarPregunta() {
    let result = ui.getIdPreguntaEliminar()
    console.log(result)
    const response = await fetch(`http://localhost:4006/EliminarPregunta`, {
        method: "DELETE", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_pregunta: result})
    })
    let resultado = await response.json()
    console.log(resultado)
    ui.showModal("Pregunta eliminada")
} 


async function conseguirUsuarios(){
    const response = await fetch(`http://localhost:4006/usuarios`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    let result = await response.json()
    return result
}

async function conseguirRespuestas(){
    const response = await fetch(`http://localhost:4006/respuestas`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    let result = await response.json()
    return result
}

async function conseguirRespuestasEspecificas(idPregunta){
    const response = await fetch(`http://localhost:4006/respuestasEsp`, {
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_pregunta: idPregunta})
    })
    let result = await response.json()
    return result
}

/*-------------------------------------------------------------------------------------------------------------------------------------*/
// EDITAR PREGUNTAAAAAAAAAAA ------------------------------------------------------------------------------------------

async function editarPregunta() {
    try {
        console.log("hola")
        let id = ui.getIdPreguntaEditar();
        console.log(id)
        let nuevaPregunta = ui.getNuevaPregunta();
        console.log(nuevaPregunta)
    
        if ((!nuevaPregunta || nuevaPregunta === "")) {
            ui.showModal("No hay nada para editar");
            return;
        }
    
        let datos = {
            id_pregunta: id,
            pregunta: nuevaPregunta
        }

        console.log(datos)
    
        try {
            const response = await fetch(`http://localhost:4006/EditarPregunta`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos)
            });
    
            let resultado = await response.json();
            console.log(resultado);
            ui.showModal("Pregunta editada correctamente");
        } catch (error) {
            console.log("Error al editar");
            ui.showModal("Hubo un error al editar la pregunta");
        }
    } catch (error) {
        console.log("Error llamada a la funcion")
    }
}

// --------------------------------- EDITAR PUNTAJE --------------------


async function EditarPuntajeUsuario(){
    try {
        let id = ui.getPuntajeEditar()
        let puntajeNuevo = ui.getPuntajeNuevo()
        if ((!puntajeNuevo || puntajeNuevo === "")) {
                ui.showModal("No puede no tener puntaje");
                return;
            }
    
    
        let datos = {
            id: id,
            puntaje: puntajeNuevo
        }
    
        try {
            const response = await fetch(`http://localhost:4006/EditarPuntaje`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos)
            });
        
            let resultado = await response.json();
            console.log(resultado);
            ui.clearEditarPuntajeInputs()
            ui.showModal("Puntaje editado correctamente");
        } catch (error) {
            console.log("Error al editar");
            ui.showModal("Hubo un error al editar el puntaje");
        }
    } catch (error) {
        console.log(error)
    }
}

// ---------------------- EDITAR RESPUESTAS -------------------------------

async function editarRespuesta() {
    try {
        let id = ui.getIdRespuestaEditar()
        let nuevaRespuesta = ui.getNuevaRespuesta()
    
        if ((!nuevaRespuesta || nuevaRespuesta === "")) {
                ui.showModal("No hay nada para editar");
                return;
        }
    
        let datos = {
            id_respuesta: id,
            respuesta: nuevaRespuesta
        }
    
        try {
            const response = await fetch(`http://localhost:4006/EditarRespuesta`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos)
            });
                
            let resultado = await response.json();
            console.log(resultado);
            ui.clearEditarPreguntaoRespuestasInputs()
            ui.showModal("Respuesta editada correctamente");
        } catch (error) {
            console.log("Error al editar");
            ui.showModal("Hubo un error al editar el puntaje");
        }
    } catch (error) {
        console.log(error)
    }

}


// --------------------------------- ELMIINAR USUARIO -------------------------------

async function eliminarUsuarios() {
    let result = ui.getIdUsuarioEliminar()
    console.log(result)
    const response = await fetch(`http://localhost:4006/EliminarUsuario`, {
        method: "DELETE", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: result})
    })
    let resultado = await response.json()
    console.log(resultado)
    ui.showModal("Usuario eliminado")
}




// -------------------------------------- SELECTS ---------------------------------------------------------------------//

async function llenarSelectPreguntaEliminar() {
    let preguntas = await conseguirPregunta()
    console.log(preguntas)
    let selectPregunta = ``
    for (let i = 0; i < preguntas.length; i++) {
    selectPregunta += `<option value="${preguntas[i].id_pregunta}">
        ${preguntas[i].id_pregunta} - ${preguntas[i].pregunta}
    </option>`;
    }

    document.getElementById("SelectPreguntaEliminar").innerHTML += selectPregunta
}

async function llenarSelectPreguntaEditar() {
    let preguntas = await conseguirPregunta()
    console.log(preguntas)
    let selectPregunta = ``
    for (let i = 0; i < preguntas.length; i++) {
    selectPregunta += `<option value="${preguntas[i].id_pregunta}">
        ${preguntas[i].id_pregunta} - ${preguntas[i].pregunta}
    </option>`;
    }

    document.getElementById("SelectPreguntaEditar").innerHTML += selectPregunta
}

async function llenarSelectUsuarios() {
    let usuarios = await conseguirUsuarios()
    console.log(usuarios)
    let selectUsuario = ``
    for (let i = 0; i < usuarios.length; i++) {
    selectUsuario += `<option value="${usuarios[i].id}">
        ${usuarios[i].id} - ${usuarios[i].usuario}
    </option>`;
    }

    document.getElementById("SelectUsuario").innerHTML += selectUsuario
}

async function llenarSelectUsuariosPuntaje() {
    let usuarios = await conseguirUsuarios()
    console.log(usuarios)
    let selectUsuario = ``
    for (let i = 0; i < usuarios.length; i++) {
    selectUsuario += `<option value="${usuarios[i].id}">
        ${usuarios[i].id} - ${usuarios[i].usuario}  - Puntaje: ${usuarios[i].puntaje}
    </option>`;
    }

    document.getElementById("SelectPuntaje").innerHTML += selectUsuario
}

async function buscarRespuestasDePregunta(){
    let idPregunta = ui.getIdPreguntaEditar()
    const respuestas = await conseguirRespuestasEspecificas(idPregunta)
    console.log(respuestas)
    document.getElementById("SelectRespuesta").innerHTML = "";
    let selectRespuesta = ``
    for (let i = 0; i < respuestas.length; i++) {
        selectRespuesta += `<option value="${respuestas[i].id_respuesta}">
            ${respuestas[i].id_respuesta} - '${respuestas[i].respuesta}' 
        </option>`;
    }
        document.getElementById("SelectRespuesta").innerHTML += selectRespuesta
    
}

/*-------------------------------------------------------------------------------------------------------------------------------*/


// CERRAR SESION !!!!!!!!
function cerrarsesion(){
    if (confirm("¿Queres cerrar sesion?") == true) {
        idLogged = -1
        ui.clearLoginInputs()
        ui.changeScreen()
        ui.showModal("Cerraste sesion")
    } else {
        ui.showModal("Seguis en sesion")
    }
}