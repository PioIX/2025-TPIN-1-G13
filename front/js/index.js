const { json } = require("body-parser");

let idLogged = -1  

// LOGIN  !!!!!!!!!!!
async function existsUser (nombre,password) { 
    respuesta = await fetch(`http://localhost:4000/usuarioExiste`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({usuario: nombre}, {contraseña: password}),    
    })
    let result = await response.json()
    console.log(result)
}

async function conseguirID(nombre) {
    respuesta = await fetch(`http://localhost:4000/conseguirId`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({usuario: nombre})

    })
    let result = await response.json()
    console.log(result)
}

async function esAdmin(nombre) {
    respuesta = await fetch(`http://localhost:4000/esAdmin`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({usuario: nombre})

    })
    let result = await response.json()
    console.log(result)
}

function login() {
    let nombre = ui.getUser(); 
    let password = ui.getPassword();
    let resultado = existsUser(nombre, password) 
    if (resultado.length == 0) {  // SEGUIR SISTEMA DE LENGHT PARA USUARIOS
        idLogged = conseguirID(nombre);
        let admin = esAdmin(nombre)
        if (admin = true) {
            ui.setUser(nombre)
            ui.changeScreenAdmin()
        } else {
            ui.setUser(nombre);
            ui.changeScreen();
        }
    } else {
        ui.showModal("Usuario o contraseña son incorrectos")
        idLogged = -1;
    }
}

// REGISTER !!!!!!!!!!!!

function conseguirDatos(nombre, password) {
    let datos = {
        usuario: nombre,
        contraseña: password,
        puntaje: 0,
        tiempo: 0,
        es_admin: false
    }
    return datos
}

async function newuser(nombre, password) {
    let resultado = existsUser(nombre, password)
    if (resultado <= 0) {
            let datos = conseguirDatos(nombre, password)
            let response = await fetch(`http://localhost:4000/insertarUsuario`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json()
        console.log(result)
        ui.showModal("Usuario creado, haga el login por favor")
    } else {
            ui.showModal("Ese usuario ya existe")
            return -1;
        }
}
            
function registrar() {
    let nombre = ui.getUser();
    let password = ui.getPassword()
    let resultado = newuser(nombre, password)
    if (resultado > 0) {
        login()
    } else {
        showModal("Usuario existente, inicie sesion o ingrese otro correo electrónico")
    }
}


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


  