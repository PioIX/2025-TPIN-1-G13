let preguntaActual = null
let contadorPuntos = 0
let sumapuntos = 100
let resta = 25
let tiempoPartida = 0
let contadorPreguntas = 0
let preguntasYaSeleccionadas = []
let temporizador; // guardará el ID del setInterval

async function conseguirCategorias() {
    try {
        const response = await fetch(`http://localhost:4006/categorias`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
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
    try {
        let result = []
        let categorias = await conseguirCategorias()
        let categoriaSeleccionada = categorias[Math.floor(Math.random() * categorias.length)].categoria; // se consigue el valor de la categoria
        let preguntasCategoria = await conseguirPreguntasDeCategoria(categoriaSeleccionada)
        let preguntaSeleccionada = preguntasCategoria[Math.floor(Math.random() * preguntasCategoria.length)].pregunta; // se consigue el valor de la pregunta
        result.push(preguntaSeleccionada, categoriaSeleccionada)
        sumapuntos = 100
        return result
    } catch (error) {
        console.log(error)
    }
}



async function juegoCarga() {
    try {
        document.getElementById("mensajeTiempo").style.display = 'none';
        if (document.getElementById("cronometro").style.display == 'none') {
            iniciarCronometro()
        }
        ui.clearIdsParts()
        if (contadorPreguntas <= 20) {
            ui.PantallaCarga()
            let yaAparecio
            let vector = await conseguirVector()
            preguntaActual = vector[0]
            console.log(preguntaActual)
            let id = await conseguirIdPregunta(preguntaActual)
            for (let i = 0; i < preguntasYaSeleccionadas.length; i++) {
                if (preguntasYaSeleccionadas[i] == id) {
                    yaAparecio = true
                }
            }
            if (yaAparecio == true) {
                console.log("La pregunta ya fue seleccionada")
                juegoCarga()
            } else {
                preguntasYaSeleccionadas.push(id)
                let categoria = vector[1]
                console.log("Pregunta: ", preguntaActual, "- Categoria: ", categoria)
                await new Promise(resolve => setTimeout(resolve, 4750))
                contadorPreguntas += 1
                ui.rellenarPrePregunta(categoria)
            }
            
        } else {
            detenerCronometro()
            console.log("finaliza el juego")
            finalizacionJuego()
        }
    } catch (error) {
        console.log(error)
    }
}






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
        if (result != null) {
            return result[0].imagen
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error)
    }
}

async function PreguntasJuego() {
    try {
        let id = await conseguirIdPregunta(preguntaActual)
        let respuestas = await conseguirRespuestasEspecificas(id)
        let imagen = await corroborarImagenEnPregunta(preguntaActual)
        console.log("id: ", id, "  respuestas: ", respuestas, "  Ruta Imagen: ", imagen)
        ui.rellenarPregunta(preguntaActual, respuestas, imagen)
    } catch (error) {
        console.log(error)
    }
}


async function verificacion(respuestaSeleccionada) {
    try {
        let id = await conseguirIdPregunta(preguntaActual)
    
        const response = await fetch(`http://localhost:4006/verificacionRespuesta`, {
            method: "POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({respuesta: respuestaSeleccionada, id_pregunta: id})
        })
        let result = await response.json()
        console.log("¿Es correcto?: ", result)
        return result
    } catch (error) {
        console.log(error)
    }
}

async function VerificarRespuesta(boton) {
    try {
        ui.desactivarBotonSolo(boton)
        let respuestaSeleccionada = boton.innerText;
        console.log("Se apretó:", respuestaSeleccionada);
        let result = await verificacion(respuestaSeleccionada)
        if (result[0].correcta === 0) {
            boton.classList.add("respuesta-incorrecta");
            console.log("La respuesta es incorrecta")
            sumapuntos -= resta
            ui.mensajePuntos()
        } else {
    
            boton.classList.add("respuesta-correcta");
            ui.deshabilitarRespuestasCorrectas()
            ui.desactivarBotones()
            clearInterval(timerInterval)
            let barra = document.getElementById("barra-timer");
            if (barra) barra.style.display = "none";
            console.log("La respuesta es correcta")
            contadorPuntos += sumapuntos
            //ui.funciondePuntajeyCambiodeColores
        }
    } catch (error) {
        console.log(error)
    }
}

let timerInterval;
let tiempoTotal = 10; // segundos
let tiempoRestante = tiempoTotal;
let respondido = false;

function iniciarTimer() {
    try {
        const barra = document.getElementById("barra-interna");
        tiempoRestante = tiempoTotal;
        respondido = false;
    
        barra.style.width = "100%";
        barra.style.backgroundColor = "#27ae60"; // verde inicial
    
        timerInterval = setInterval(() => {
            tiempoRestante--;
    
            let porcentaje = (tiempoRestante / tiempoTotal) * 100;
            barra.style.width = porcentaje + "%";
    
            // Cambiar color según tiempo
            if (tiempoRestante <= 3) {
                barra.style.backgroundColor = "#e74c3c"; // rojo
            } else if (tiempoRestante <= 6) {
                barra.style.backgroundColor = "#f1c40f"; // amarillo
            }
    
            // Si se acabó el tiempo
            if (tiempoRestante <= 0) {
                clearInterval(timerInterval);
                if (!respondido) {
                    document.getElementById("mensaje").style.display = 'none';
                    document.getElementById("mensajeTiempo").innerHTML = "";
                    document.getElementById("mensajeTiempo").style.display = 'block';
                    
                    document.getElementById("mensajeTiempo").innerHTML += `
                        <div class="mensajeTiempo">⏰ ¡Se acabó el tiempo!
                        <br>Pero no te preocupes, aún puedes seguir jugando<br>
                        <button onclick="juegoCarga()">Continuar</div>
                    `;
                    ui.deshabilitarRespuestas();
                }
            }
        }, 1000);
    
    } catch (error) {
        console.log(error)
    }

}

function iniciarCronometro() {
    try {
        tiempoPartida = 0;
        document.getElementById("cronometro").style.display = 'block';
        document.getElementById("cronometro").innerText = `Tiempo: 0s`;
    
        temporizador = setInterval(() => {
            tiempoPartida++;
            document.getElementById("cronometro").innerText = `Tiempo: ${tiempoPartida}s`;
        }, 1000);
    } catch (error) {
        console.log(error)
    }
}

function detenerCronometro() {
    try {
        clearInterval(temporizador);
        console.log("Se detuvo el cronometro. Tiempo final: ", tiempoPartida)
    } catch (error) {
        console.log(error)
    }
}


// FINALIZACION DEL JUEGO -------------------------------------------------

async function BuscarPuntajeUsuario(idLogged) {
    try {
        const response = await fetch(`http://localhost:4006/BuscarPuntajeUsuario`, {
                method: "POST", //GET, POST, PUT o DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: idLogged})
            })
            let result = await response.json()
            if (result[0].puntaje == null) {
                result[0].puntaje = 0
                return result[0].puntaje
            } else {
                return result[0].puntaje
            }
    } catch (error) {
        console.log(error)
    }
}

async function BuscarTiempoUsuario(idLogged) {
    try {
        const response = await fetch(`http://localhost:4006/BuscarTiempoUsuario`, {
                method: "POST", //GET, POST, PUT o DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: idLogged})
            })
            let result = await response.json()
            if (result[0].tiempo == null) {
                return result[0].tiempo = 0
            } else {
                return result[0].tiempo
            }
    } catch (error) {
        console.log(error)
    }
}

async function insertarPuntajeDelUsuario(contadorPuntos, tiempoPartida, idLogged) {
    try {
        const response = await fetch(`http://localhost:4006/update`, {
                method: "PUT", //GET, POST, PUT o DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({puntaje: contadorPuntos, tiempo: tiempoPartida, id: idLogged})
            })
            let result = await response.json()
            console.log(result)
            return result
    } catch (error) {
        console.log(error)
    }
}


async function finalizacionJuego() {
    try {
        console.log(idLogged)
        let puntajeEnTabla = await BuscarPuntajeUsuario(idLogged)
        let tiempoEnTabla = await BuscarTiempoUsuario(idLogged)
        console.log(puntajeEnTabla, tiempoEnTabla)
        // let realizado = await insertarPuntajeDelUsuario(contadorPuntos, tiempoPartida, idLogged)
        
        if (puntajeEnTabla >= contadorPuntos) {
            ui.showModal("En otra Partida ha realizado más puntos")
            ui.final()
            ui.mostrarSecciones()
        } else {
            let realizado = await insertarPuntajeDelUsuario(contadorPuntos, tiempoPartida, idLogged)
            console.log(realizado)
            ui.final()
            ui.mostrarSecciones()
        }
        if (tiempoPartida < tiempoEnTabla && puntajeEnTabla == contadorPuntos){
            if (tiempoEnTabla == 0) {
                let realizado = await insertarPuntajeDelUsuario(contadorPuntos, tiempoPartida, idLogged)
                console.log(realizado)
                ui.final()
                ui.mostrarSecciones()
            } else {
                ui.showModal("En otra partida hizo los mismos puntos en menos tiempo.")
                ui.final()
                ui.mostrarSecciones()
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function actualizarTabla() {
    try {
        const response = await fetch(`http://localhost:4006/ranking`, {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        })
        const usuarios = await response.json();

        const cuerpoTabla = document.getElementById("cuerpoRanking");
        cuerpoTabla.innerHTML = ""; // limpia el contenido anterior
        let agregar = ""
        for (let i=0; i < usuarios.length; i++) {
            agregar += `
                <tr>
                    <td> ${i + 1} </td>
                    <td> ${usuarios[i].usuario} </td>
                    <td> ${usuarios[i].puntaje}</td>
                    <td> ${usuarios[i].tiempo} </td>
                </tr>`
        }
        cuerpoTabla.innerHTML = agregar
    } catch (error) {
        console.error("Error al actualizar el ranking", error);
    }
}