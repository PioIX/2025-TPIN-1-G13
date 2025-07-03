let nombre = "";
let width = 0;
let categoriaElegida = 0;
let preguntasRespondidas = ["pregunta"];
let arrayContadorCategorias = [];
let ingresoNombre = document.getElementById("nombre");
let bienvenida = document.getElementById("bienvenida");
let juego = document.getElementById("cuerpo");
let preg = document.getElementById("preguntas")
let inicio = document.getElementById("juego");
let aleatorio = document.getElementById("aleatorio");
let logo = document.getElementById("logo");
let seleccion = document.getElementById("seleccion");
let seleccionRealizada = document.getElementById("seleccionRealizada");
let cargarComoJugar = document.getElementById("cargarComoJugar");
let contenedorPregunta = document.getElementById("contenedorPregunta");
let preguntaPrimera = document.getElementById("preguntaPrimeraParte");
let preguntaImagen = document.getElementById("preguntaImagen");
let preguntaEscrito = document.getElementById("preguntaEscrito");
let resultado = document.getElementById("resultado");
let header = document.getElementById("header");
let menu2 = document.getElementById("menu2");
let mensajeInicio = document.getElementById("mensajeInicio");
let errorNombre = document.getElementById("errorNombre");
let nombrePuntos = document.getElementById("nombrePuntos");
let cargarEstadisticas = document.getElementById("cargarEstadisticas");
let finDelJuego = document.getElementById("finDelJuego");
window.location.hash = "no-back-button";
window.location.hash = "Again-No-back-button"; //esta linea es necesaria para chrome
window.onhashchange = function() { window.location.hash = "no-back-button"; }
let sumapuntos = 100;
let tiempo = 0;
let contadorPreguntas = 0;
let contadorPuntos = 0;

function Nombre() {
    contadorPreguntas = 0;
    contadorPuntos = 0;
    nombre = "";
    arrayContadorCategorias = [
        ['ciencia'],
        ['entretenimiento'],
        ['deporte'],
        ['arte'],
        ['geografia'],
        ['historia']
    ];
    preguntasRespondidas = ["pregunta"];
    finDelJuego.style.display = "none";
    seleccion.style.display = "flex";
    aleatorio.style.display = "flex";
    mensajeInicio.style.display = "flex";
    if (ingresoNombre.value != "") {
        errorNombre.style.display = "none";
        nombre = ingresoNombre.value;
        bienvenida.style.display = "none";
        juego.style.display = "block";
        let informacion =
            `<label>Hola ` + nombre + `, bienvenido/a a nuestro juego de trivias!</label>
        <label>En el juego se encontrarán 6 categorías sobre las cuales deberá contestar preguntas.
        Qué categoría toque estará dada al azar, y según cada pregunta tendrá cuatro o tres opciones de respuesta a elegir, siendo solo 1 de estas correcta.</label>
        <img src="Imagenes/comojugar.png" alt="como jugar" width="350px" height="100px">
        <label class="pregunta">Grupo: Cabrera Martín, Loza Flores Denise, Suárez Mateo, Venerus Bianca</label>
        <label class="pregunta">Código: Suárez Mateo y Venerus Bianca</label>
        `;
        cargarComoJugar.innerHTML = informacion;
    } else {
        errorNombre.style.display = "flex";
    }
    Puntaje();

}

function openbtt(evt, btt) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    preg.style.display = "none";
    document.getElementById(btt).style.display = "block";
    evt.currentTarget.className += " active";
};

function categoria() {
    errorNombre.style.display = "none";
    aleatorio.style.display = "none";
    logo.style.display = "block";
    header.style.display = "none";
    menu2.style.display = "flex";
    mensajeInicio.style.display = "none";
    let nroAleatorio = Math.floor(Math.random() * 6);
    if (arrayContadorCategorias[nroAleatorio].length < 7) {
        categoriaElegida = nroAleatorio;
    } else {
        categoria();
    }
    setTimeout(categoriaSeleccionada, 4000);
}

function categoriaSeleccionada() {
    logo.style.display = "none";
    contadorPreguntas++;
    let info =
        `
    <label class="categoria">- ` + tematica[categoriaElegida].nombre + ` -</label>
    <img src="` + tematica[categoriaElegida].icono + `" alt="Categoría" width="200px" height="200px">
    <button class="comenzar" onclick="pregunta(` + categoriaElegida + `)">Comenzar con la pregunta</button>
    `;
    seleccion.style.display = "none";
    seleccionRealizada.style.display = "flex";
    seleccionRealizada.innerHTML = info;
}

function pregunta(nrotematica) {
    let aleatory;
    let verificar = 0;
    let nroNoRepetido = 1;
    sumapuntos = 100;
    switch (nrotematica) {
        case 0:
            // Aleatorio entre cero y 5 PREGUNTAS CIENCIA
            aleatory = Math.floor(Math.random() * 6);
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[0].length; j++) {
                if (aleatory == arrayContadorCategorias[0][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[0].push(aleatory);
            }
            break
        case 1:
            //Aleatorio entre 6 y 11 PREGUNTAS ENTRETENIMIENTO
            aleatory = Math.floor(Math.random() * 6) + 6;
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[1].length; j++) {
                if (aleatory == arrayContadorCategorias[1][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[1].push(aleatory);
            }
            break
        case 2:
            //Aleatorio entre 12 y 17 PREGUNTAS DEPORTE
            aleatory = Math.floor(Math.random() * 6) + 12;
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[2].length; j++) {
                if (aleatory == arrayContadorCategorias[2][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[2].push(aleatory);
            }
            break
        case 3:
            //Aleatorio entre 18 y 23 PREGUNTAS ARTE
            aleatory = Math.floor(Math.random() * 6) + 18;
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[3].length; j++) {
                if (aleatory == arrayContadorCategorias[3][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[3].push(aleatory);
            }
            break
        case 4:
            //Aleatorio entre 24 y 29 PREGUNTAS GEOGRAFIA
            aleatory = Math.floor(Math.random() * 6) + 24;
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[4].length; j++) {
                if (aleatory == arrayContadorCategorias[4][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[4].push(aleatory);
            }
            break
        case 5:
            //Aleatorio entre 30 y 35 PREGUNTAS HISTORIA
            aleatory = Math.floor(Math.random() * 6) + 30;
            for (let i = 0; i < preguntasRespondidas.length; i++) {
                if (aleatory == preguntasRespondidas[i]) {
                    verificar = 1;
                }
            }
            if (verificar == 1) {
                pregunta(nrotematica);
            } else {
                preguntasRespondidas.push(aleatory);
                escribirPregunta(aleatory, nrotematica);
            }
            for (let j = 0; j < arrayContadorCategorias[5].length; j++) {
                if (aleatory == arrayContadorCategorias[5][j]) {
                    nroNoRepetido = 0;
                }
            }
            if (nroNoRepetido == 1) {
                arrayContadorCategorias[5].push(aleatory);
            }
            break

    }
}

function escribirPregunta(nroPregunta, tema) {
    nombrePuntos.innerHTML = nombre + ": " + contadorPuntos;
    tiempo = 0;
    move(nroPregunta, 1);
    resultado.style.display = "none";
    preg.style.display = "flex";
    inicio.style.display = "none";
    preguntaPrimera.innerHTML = "";
    preguntaImagen.innerHTML = "";
    preguntaEscrito.innerHTML = "";
    preguntaImagen.style.display = "none";
    preguntaEscrito.style.display = "none";
    let primera =
        `
    <img src="` + tematica[tema].icono + `" alt="Categoría" width="70px" height="70px">
    <label class="pregunta">` + preguntas[nroPregunta].pregunta + `</label>
`;
    if (preguntas[nroPregunta].rta1.slice(-3) == 'png') {
        preguntaImagen.style.display = "grid";
        let opciones =
            `
<img id="op1" class="opcionimagen op1grid" src="` + preguntas[nroPregunta].rta1 + `" onclick="verificar(` + nroPregunta + `,1)">
<img id="op2" class="opcionimagen op2grid" src="` + preguntas[nroPregunta].rta2 + `" onclick="verificar(` + nroPregunta + `,2)">
<img id="op3" class="opcionimagen op3grid" src="` + preguntas[nroPregunta].rta3 + `" onclick="verificar(` + nroPregunta + `,3)">
<img id="op4" class="opcionimagen op4grid" src="` + preguntas[nroPregunta].rta4 + `" onclick="verificar(` + nroPregunta + `,4)">
`;
        preguntaPrimera.innerHTML += primera;
        if (preguntas[nroPregunta].hasOwnProperty('imagen') === true) {
            let imagen = `<img src="` + preguntas[nroPregunta].imagen + `" alt="Imagen de la pregunta" class="tamañoImagen">`;
            preguntaPrimera.innerHTML += imagen;
        }
        preguntaImagen.innerHTML += opciones;
    } else {
        preguntaEscrito.style.display = "flex";
        let opciones =
            `
    <label id="opl1" class="opcion clase" onclick="verificar(` + nroPregunta + `,1)">` + preguntas[nroPregunta].rta1 + `</label>
    <label id="opl2" class="opcion clase" onclick="verificar(` + nroPregunta + `,2)">` + preguntas[nroPregunta].rta2 + `</label>
    <label id="opl3" class="opcion clase" onclick="verificar(` + nroPregunta + `,3)">` + preguntas[nroPregunta].rta3 + `</label>
    `;
        preguntaPrimera.innerHTML += primera;
        if (preguntas[nroPregunta].hasOwnProperty('imagen') === true) {
            let image = `<img src="` + preguntas[nroPregunta].imagen + `" alt="Imagen de la pregunta">`;
            preguntaPrimera.innerHTML += image;
        }
        preguntaEscrito.innerHTML += opciones;
        if (preguntas[nroPregunta].hasOwnProperty('rta4') === true) {
            let rta4 = `<label id="opl4" class="opcion clase" onclick="verificar(` + nroPregunta + `,4)">` + preguntas[nroPregunta].rta4 + `</label>`;
            preguntaEscrito.innerHTML += rta4;
        }
    }
}

function verificar(preg, posicion) {
    let correcta = preguntas[preg].correcta;
    if (posicion == 1) {
        var nroOpcion = preguntas[preg].rta1;
    } else if (posicion == 2) {
        var nroOpcion = preguntas[preg].rta2;
    } else if (posicion == 3) {
        var nroOpcion = preguntas[preg].rta3;
    } else {
        var nroOpcion = preguntas[preg].rta4;
    }
    if (correcta == nroOpcion) {
        return acierto(preg, posicion);
    } else {
        return error(preg, posicion);
    };
}

function acierto(pregunta, nroOp) {
    if (preguntas[pregunta].rta1.slice(-3) == 'png') {
        switch (nroOp) {
            case 1:
                var resp = document.getElementById("op1");
                var textoimagen = `<img class="correctoimagen op1grid" src="` + preguntas[pregunta].rta1 + `">`;
                break
            case 2:
                var resp = document.getElementById("op2");
                var textoimagen = `<img class="correctoimagen op2grid" src="` + preguntas[pregunta].rta2 + `">`;
                break
            case 3:
                var resp = document.getElementById("op3");
                var textoimagen = `<img class="correctoimagen op3grid" src="` + preguntas[pregunta].rta3 + `">`;
                break
            case 4:
                var resp = document.getElementById("op4");
                var textoimagen = `<img class="correctoimagen op4grid" src="` + preguntas[pregunta].rta4 + `">`;
                break
        }
        if (preguntas[pregunta].hasOwnProperty('rta4') === true) {
            var largo = 5;
        } else {
            var largo = 4;
        }
        for (var j = 1; j < largo; j++) {
            if (j == nroOp) {
                resp.outerHTML = textoimagen;
            } else {
                let id = "op" + j;
                document.getElementById(id).style.pointerEvents = "none";
                // To disable: document.getElementById('id').style.pointerEvents = 'none'
            }
        }

    } else {
        switch (nroOp) {
            case 1:
                var resp = document.getElementById("opl1");
                var textolabel = `<label class="correcto">` + preguntas[pregunta].rta1 + `</label>`;
                break
            case 2:
                var resp = document.getElementById("opl2");
                var textolabel = `<label class="correcto">` + preguntas[pregunta].rta2 + `</label>`;
                break
            case 3:
                var resp = document.getElementById("opl3");
                var textolabel = `<label class="correcto">` + preguntas[pregunta].rta3 + `</label>`;
                break
            case 4:
                var resp = document.getElementById("opl4");
                var textolabel = `<label class="correcto">` + preguntas[pregunta].rta4 + `</label>`;
                break
        }
        if (preguntas[pregunta].hasOwnProperty('rta4') === true) {
            var largo = 5;
        } else {
            var largo = 4;
        }
        for (var i = 1; i < largo; i++) {
            if (i == nroOp) {
                resp.outerHTML = textolabel;
            } else {
                let id = "opl" + i;
                document.getElementById(id).style.pointerEvents = "none";
            }
        }

    }
    contadorPuntos += sumapuntos;
    nombrePuntos.innerHTML = nombre + ": " + contadorPuntos;
    tiempo = 1;
    resultado.style.display = "flex";
    window.location.href = "#resultado";
    let infoResultado =
        `
    <div class="resultadoGrid">
    <p id="grid1"> ¡Muy bien! Has seleccionado la respuesta correcta. Ahora puedes seguir con la siguiente pregunta</p>
    <img id="grid2" src="Imagenes/acierto.png" width="60px" height="60px">
    </div>
    <button class="seguir" onclick="cantPreguntas()" >Seguir</button>
    `;
    resultado.innerHTML = infoResultado;
}

function error(nro, pos) {
    if (sumapuntos == 100) {
        sumapuntos = 50;
    } else if (sumapuntos == 50) {
        if (preguntas[nro].hasOwnProperty('rta4') === true) {
            sumapuntos = 25;
        } else {
            sumapuntos = 0;
        }
    } else {
        sumapuntos = 0;
    }
    if (sumapuntos == 50 || sumapuntos == 25 || sumapuntos == 0) {
        if (preguntas[nro].rta1.slice(-3) == 'png') {
            switch (pos) {
                case 1:
                    var resp = document.getElementById("op1");
                    break
                case 2:
                    var resp = document.getElementById("op2");
                    break
                case 3:
                    var resp = document.getElementById("op3");
                    break
                case 4:
                    var resp = document.getElementById("op4");
                    break
            }
            let claseG = "op" + pos + "grid";
            resp.classList.remove('opcionimagen');
            resp.classList.add('errorimagen', claseG);
            resp.style.pointerEvents = "none";
        } else {
            switch (pos) {
                case 1:
                    var resp = document.getElementById("opl1");
                    break
                case 2:
                    var resp = document.getElementById("opl2");
                    break
                case 3:
                    var resp = document.getElementById("opl3");
                    break
                case 4:
                    var resp = document.getElementById("opl4");
                    break
            }
            resp.className = "error";
            resp.style.pointerEvents = "none";
        }
    }
    if (sumapuntos == 50 || sumapuntos == 25) {
        resultado.style.display = "flex";
        let infoResultado =
            `
    <div class="resultadoGrid">
    <p id="grid1"> ¡Oh no! Te has equivocado, pero no importa. Vuelve a intentarlo! Mucha suerte</p>
    <img id="grid2" src="Imagenes/equivocado.png" width="60px" height="60px">
    </div>
    `;
        resultado.innerHTML = infoResultado;
    } else {
        tiempo = 1;
        if (preguntas[nro].hasOwnProperty('rta4') === true) {
            var largo = 5;
        } else {
            var largo = 4;
        }
        for (var j = 1; j < largo; j++) {
            if (preguntas[nro].rta1.slice(-3) == 'png') {
                var idimagen = "op" + j;
                var clase = "correctoimagen";
                var claseGrid = "op" + pos + "grid";
            } else {
                var idimagen = "opl" + j;
                var clase = "correcto";
            }
            if (document.getElementById(idimagen).style.pointerEvents !== "none") {
                document.getElementById(idimagen).style.pointerEvents = "none";
                if (preguntas[nro].rta1.slice(-3) == 'png') {
                    document.getElementById(idimagen).classList.remove('opcionimagen');
                    document.getElementById(idimagen).classList.add(clase, claseGrid);
                } else {
                    document.getElementById(idimagen).className = clase;
                }

            }
        }
        resultado.style.display = "flex";
        window.location.href = "#resultado";
        let infoResultado =
            `
    <div class="resultadoGrid">
    <p id="grid1"> ¡Rayos! Te has quedado sin intentos. Ten mucha suerte con la próxima pregunta</p>
    <img id="grid2" src="Imagenes/equivocado.png" width="60px" height="60px">
    </div>
    <button class="seguir" onclick="cantPreguntas()">Seguir</button>
    `;
        resultado.innerHTML = infoResultado;
    }
}

function tiempoAcabado(preg) {
    var correcta = preguntas[preg].correcta;

    if (preguntas[preg].rta1.slice(-3) == 'png') {
        var TipoDeRespuesta = "op";
        var claseVerde = "correctoimagen";
        var claseRojo = "errorimagen";
    } else {
        var TipoDeRespuesta = "opl";
        var claseVerde = "correcto";
        var claseRojo = "error";
    }

    if (preguntas[preg].rta1 == correcta) {
        document.getElementById(TipoDeRespuesta + 1).classList.add(claseVerde);
        document.getElementById(TipoDeRespuesta + 1).style.pointerEvents = "none";
    } else {
        document.getElementById(TipoDeRespuesta + 1).classList.add(claseRojo);
        document.getElementById(TipoDeRespuesta + 1).style.pointerEvents = "none";
    }

    if (preguntas[preg].rta2 == correcta) {
        document.getElementById(TipoDeRespuesta + 2).classList.add(claseVerde);
        document.getElementById(TipoDeRespuesta + 2).style.pointerEvents = "none";
    } else {
        document.getElementById(TipoDeRespuesta + 2).classList.add(claseRojo);
        document.getElementById(TipoDeRespuesta + 2).style.pointerEvents = "none";
    }

    if (preguntas[preg].rta3 == correcta) {
        document.getElementById(TipoDeRespuesta + 3).classList.add(claseVerde);
        document.getElementById(TipoDeRespuesta + 3).style.pointerEvents = "none";
    } else {
        document.getElementById(TipoDeRespuesta + 3).classList.add(claseRojo);
        document.getElementById(TipoDeRespuesta + 3).style.pointerEvents = "none";
    }

    if (preguntas[preg].hasOwnProperty('rta4') === true) {
        if (preguntas[preg].rta4 == correcta) {
            document.getElementById(TipoDeRespuesta + 4).classList.add(claseVerde);
            document.getElementById(TipoDeRespuesta + 4).style.pointerEvents = "none";
        } else {
            document.getElementById(TipoDeRespuesta + 4).classList.add(claseRojo);
            document.getElementById(TipoDeRespuesta + 4).style.pointerEvents = "none";
        }
    }

    resultado.style.display = "flex";
    window.location.href = "#resultado";
    let infoResultado =
        `
    <div class="resultadoGrid">
    <p id="grid1">¡Se ha acabado el tiempo! Pero no te preocupes, en la próxima pregunta seguro llegarás a tiempo. ¡Mucha Suerte!</p>
    <img id="grid2" src="Imagenes/equivocado.png" width="60px" height="60px">
    </div>
    <button class="seguir" onclick="cantPreguntas()">Seguir</button>
    `;
    resultado.innerHTML = infoResultado;
}

function cantPreguntas() {
    if (contadorPreguntas < 15) {
        preg.style.display = "none";
        inicio.style.display = "flex";
        seleccion.style.display = "flex";
        aleatorio.style.display = "flex";
        seleccionRealizada.style.display = "none";
    } else {
        var objetoJugador = {
            nombre: nombre,
            puntos: contadorPuntos
        };
        estadisticas.push(objetoJugador);
        header.style.display = "flex";
        menu2.style.display = "none";
        Puntaje();
        preg.style.display = "none";
        inicio.style.display = "flex";
        seleccionRealizada.style.display = "none";
        finDelJuego.style.display = "flex";
        let info =
            `
        <label>¡Muy bien ` + nombre + `! Has conseguido ` + contadorPuntos + ` puntos en total! Ve a ver las estadísticas</label>
        <label>Si quieres volver a jugar o competir con tu amigo presiona este botón</label>
        <button class="seguir" onclick="repetirJuego()">REPETIR JUEGO</button>
        `;
        finDelJuego.innerHTML = info;
    }
}

var id;

function move(nro, pos) {
    var elem = document.getElementById("myBar");
    width = 1;
    clearInterval(id);
    id = setInterval(frame, 250);
    elem.style.backgroundColor = "green";

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            sumapuntos = 0;
            tiempoAcabado(nro);
        } else {
            if (tiempo == 0) {
                width++;
                elem.style.width = width + '%';
                if (width > 50 && width <= 70) {
                    elem.style.backgroundColor = "rgb(190, 178, 8)";
                } else if (width > 70 && width <= 85) {
                    elem.style.backgroundColor = "rgb(175, 70, 9)";
                } else if (width > 85) {
                    elem.style.backgroundColor = "rgb(175, 20, 9)";
                }
            } else {
                elem.style.width = width + '%';
            }
        }
    }
}

function Puntaje() {
    let titulo = `<h2>ESTADÍSTICAS</h2>`;
    cargarEstadisticas.innerHTML = titulo;
    for (var i = 0; i < estadisticas.length; i++) {

        let info =
            `
        <div class="gridEstadisticas">
            <label class="pose1">` + estadisticas[i].nombre + `</label>
            <div class="pose2">
                <div class="progreso" id="progreso` + i + `">
                <label class="porcentaje" id="porcentaje` + i + `"></label>
                </div>
            </div>
            <label class="pose3">` + estadisticas[i].puntos + `</label>
        </div>
        `;
        cargarEstadisticas.innerHTML += info;
        let id = "progreso" + i;
        let por = "porcentaje" + i;
        let largo = (estadisticas[i].puntos * 100) / 1500;
        document.getElementById(id).style.width = largo + '%';
        document.getElementById(por).innerHTML = largo.toFixed() + '%';
    }
}

function repetirJuego() {
    bienvenida.style.display = "block";
    juego.style.display = "none";
    ingresoNombre.value = "";
}