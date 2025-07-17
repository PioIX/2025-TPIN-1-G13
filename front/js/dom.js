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
        document.getElementById("imagen").value = "";
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
        if (id === 'ranking') {
        actualizarTabla();
    }
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

    getImagenEditar() {
        return document.getElementById("NuevaRutaImagen").value
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
        await new Promise(resolve => setTimeout(resolve, 5000))
        document.getElementById("pantalla-carga").style.display = "none";
        // HACER CONTADOR DEL TIEMPO GENERAL
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
            <label class="categoria"> ` + tematica[x].nombre + ` </label>
            <img src="` + tematica[x].icono + `" alt="Categoría">
            <p> Puntaje Actual: ${contadorPuntos} </p>
            <button class="comenzar" onclick="PreguntasJuego()">Comenzar con la pregunta</button>
        `;
        div.innerHTML = info
        div.style.display = 'block';
    }

    rellenarPregunta(preguntaActual, respuestas, imagen) {
        document.getElementById("prePregunta").style.display = 'none';
        let divPregunta = document.getElementById("preguntaResponder")
        divPregunta.style.display = 'block'
        let barraHTML = `
        <div id="barra-timer">
            <div id="barra-interna"></div>
        </div>
        `;
        if (imagen != undefined) {
            let info = 
                `
                ${barraHTML}
                <h2 class="numeroPregunta">Pregunta ${contadorPreguntas}</h2>
                <div class="contenedorImagen">
                    <img src="${imagen}" alt="Imagen de la Pregunta" class="imagenPregunta">
                </div>  
                <h3 class="pregunta-juego">${preguntaActual}</h3>
            `;
            divPregunta.innerHTML = info
        } else {
            let info = 
                `
                ${barraHTML}
                <h3>${preguntaActual}</h3>
            `;
            divPregunta.innerHTML = info
        }

        let divRespuesta = document.getElementById("respuestasPregunta")
        divRespuesta.style.display = 'block';
        let infoOptions = ``;
        for (let i = 0; i < respuestas.length; i++) {
            infoOptions += `
                <button onclick="VerificarRespuesta(this)" id="respuesta${i}">${respuestas[i].respuesta}</button>
        `;
        }
        divRespuesta.innerHTML = infoOptions
        iniciarTimer()
    }

    deshabilitarRespuestas() {
        document.getElementById("respuestasPregunta").style.display = 'none';
    }

    async deshabilitarRespuestasCorrectas() {
        document.getElementById("mensaje").style.display = 'none';
        document.getElementById("preguntaResponder").innerHTML += `
                    <div class="mensajeCorrecta">
                    <p>BIEN HECHO, HAS ACERTADO LA PREGUNTA</p>
                    </div>
                `;
        await new Promise(resolve => setTimeout(resolve, 3000))
        juegoCarga()
        
    }

    desactivarBotonSolo(boton) {
        boton.disabled = true;
        boton.style.cursor = "not-allowed";
        boton.style.opacity = "0.8";
    }

    desactivarBotones() {
        const botones = document.querySelectorAll("#respuestasPregunta button");
        botones.forEach(b => {
            b.disabled = true;
            b.style.cursor = "not-allowed";
            b.style.opacity = "0.8";
        });
    }

    mensajePuntos() {
        if (document.getElementById("mensaje").style.display == 'none') {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'block';
            document.getElementById("mensaje").innerHTML += `
                    <div class="mensajePuntos">
                    <p>Has Fallado. Aún puedes contestar, pero valdrá menos puntos</p>
                    </div>
                `;
        } else {
            console.log("Ya hay un mensaje")
        }
    }

    clearIdsParts() {
        document.getElementById("preguntaResponder").style.display = 'none';
        document.getElementById("mensaje").style.display = 'none';
        document.getElementById("respuestasPregunta").style.display = 'none';
    }

    final() {
        document.getElementById("respuestasPregunta").style.display = 'none';
        document.getElementById("mensaje").style.display = 'none';
        document.getElementById("preguntaResponder").style.display = 'none';
        document.getElementById("prePregunta").style.display = 'none';
        document.getElementById("cronometro").style.display = 'none';
        this.mostrarSeccionJUGAR('ranking')
        document.getElementById("aleatorio").style.display = 'block';
    }

    mostrarSecciones() {
        document.getElementById("EncabezadoJuego").style.display = 'block';
        document.getElementById("botonesMenu").style.display = 'block';
    }
}



const ui = new UserInterface();