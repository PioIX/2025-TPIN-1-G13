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



function newuser(email,password,username) {
    let resultado = existsUser(email, password)
    if (resultado <= 0) {
            users.push(new User (username, email, password))
            return users.length;
        } else {
            ui.showModal("Ese usuario ya existe")
            return -1;
        }
}
            
function registrar() {
    let username = ui.getUser();
    let email = ui.getEmail();
    let password = ui.getPassword();
    let resultado = newuser(email, password, username)
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


  