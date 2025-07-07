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
        if (notepad.style.display == "none") {
            notepad.style.display = "block";
            loginForm.style.display = "none";
        } else {
            notepad.style.display = "none";
            loginForm.style.display = "flex";
        }
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
        const secciones = document.querySelectorAll('ContenedorJuego');
        secciones.forEach(sec => {
            sec.style.display = (sec.id === id) ? 'block' : 'none';
        }); 
        
    }

    // PREGUNTAS GET ---------------------------------------------------------------------------------
    getPregunta() {
        return document.getElementById("pregunta").value
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
}

const ui = new UserInterface();