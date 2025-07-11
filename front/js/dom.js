class UserInterface {
    constructor() {

    }

    getEmail() {
        return document.getElementById("email").value;
    }

    getUser() {
        return document.getElementById("username").value;
    }

    setUser(username) {
        document.getElementById("username").textContent = `¡Bienvenido ${username}!`;
    }

    getPassword() {
        return document.getElementById("password").value;
    }


    // CLEAR INPUTS -----------------------------------------------------------------------

    clearLoginInputs() {
        document.getElementById("password").value = "";
        document.getElementById("username").value = "";
    }

    clearAgregarPreguntasyRespuestasInputs() {
        document.getElementById("pregunta").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("opcionUno").value = "";
        document.getElementById("opcion1").checked = false
        document.getElementById("opcionDos").value = "";
        document.getElementById("opcion2").checked = false
        document.getElementById("opcionTres").value = "";
        document.getElementById("opcion3").checked = false
        document.getElementById("opcionCuatro").value = "";
        document.getElementById("opcion4").checked = false
    }

    clearEditarPreguntaoRespuestasInputs() {
        document.getElementById("SelectPreguntaEditar").value = "";
        document.getElementById("NuevaPregunta").value = "";
        document.getElementById("SelectRespuesta").value = "";
        document.getElementById("nuevaRespuesta").value = "";
    }

    clearEditarPuntajeInputs() {
        document.getElementById("SelectPuntaje").value = "";
        document.getElementById("puntajeNuevo").value = "";
    }

    clearSelectsEliminarUsuarioyEliminarPregunta() {
        document.getElementById("SelectUsuario").value = "";
        document.getElementById("SelectPreguntaEliminar").value = "";
    }
    // CHANGE SCREEN --------------------------------------------------------------------------
    changeScreen() {
        const notepad = document.getElementById("notepad");
        const loginForm = document.getElementById("loginForm");
        const header = document.getElementById("barra");
        loginForm.style.display = 'none';
        header.style.display = 'none';
        notepad.style.display = 'block';
    }

    changeScreenAdmin() {
        const admin = document.getElementById("admin");
        const loginForm = document.getElementById("loginForm");
        const notepad = document.getElementById("notepad");
        notepad.style.display = "none";
        loginForm.style.display = "none";
        admin.style.display = "block";
    }

    mostrarSeccion(id) {
        const secciones = document.querySelectorAll('.admin-seccion');
        secciones.forEach(sec => {
            sec.style.display = (sec.id === id) ? 'block' : 'none';
        }); 
        
    }

    mostrarSeccionJUGAR(id) {
        const secciones = document.querySelectorAll('.juego-seccion');
        secciones.forEach(sec => {
            sec.style.display = (sec.id === id) ? 'block' : 'none';
        }); 
        
    }

    // PREGUNTAS GET ---------------------------------------------------------------------------------
    getPregunta() {
        return document.getElementById("pregunta").value
    }

    getImagen() {
        return document.getElementById("imagen").value
    }

    getCategoria() {
        return document.getElementById("categoria").value
    }


    getIdPreguntaEliminar() {
        return document.getElementById("SelectPreguntaEliminar").value
    }

    getIdPreguntaEditar() {
        return document.getElementById("SelectPreguntaEditar").value
    }

    getNuevaPregunta(){
        return document.getElementById("NuevaPregunta").value
    }

    // GET USUARIOS O SIMILAR ------------------------------------------------------------------------------------

    getIdUsuarioEliminar() {
        return document.getElementById("SelectUsuario").value
    }

    getPuntajeEditar() {
        return document.getElementById("SelectPuntaje").value
    }

    getPuntajeNuevo() {
        return document.getElementById("puntajeNuevo").value
    }



    // RESPUESTAS ----------------------------------------------------------------------------------------------------------------

    getNuevaRespuesta() {
        return document.getElementById("nuevaRespuesta").value
    }

    getIdRespuestaEditar() {
        return document.getElementById("SelectRespuesta").value
    }

    // modal -------------------------------------------------------------------------------------------------------------------------

    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;

        const modal = new bootstrap.Modal(document.getElementById("modal"), {
            keyboard: true,
            focus: true
        });

        modal.show();
    } 














    // JUEGO -------------------------------------------------------------------------------------

    async PantallaCarga(){
        document.getElementById("EncabezadoJuego").style.display = 'none';
        document.getElementById("mensajeInicio").style.display = 'none';
        document.getElementById("pantalla-carga").style.display = "flex";
        document.getElementById("aleatorio").style.display = "none";
        await new Promise(resolve => setTimeout(resolve, 2000))
        document.getElementById("pantalla-carga").style.display = "none";
    }

    rellenarPrePregunta(categoria){
        let div = document.getElementById("prePregunta")
        let x = 0
        for (let i = 0; i < tematica.length; i++) {
            if (tematica[i].nombre == categoria) {
                x = i 
            }
        }
        let info =
            `
            <label class="categoria">- ` + tematica[x].nombre + ` -</label>
            <img src="` + tematica[x].icono + `" alt="Categoría" width="200px" height="200px">
            <button class="comenzar" onclick="PreguntasJuego()">Comenzar con la pregunta</button>
        `;
        div.innerHTML = info
        div.style.display = 'block';
    }

    rellenarPregunta(pregunta, imagen, opciones) {
        // hacer timer
        let div = document.getElementById("preguntaResponder")
        div.style.display = 'block'
        if (imagen.length > 0) {
            let info = 
                `
                en este info se agrega un <img src 'url de la variable imagen' y despues la pregunta y sus opciones
            `;
        }
        
        
    }
}

const ui = new UserInterface();