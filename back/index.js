var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});


// COMIENZA EL TP

app.get('/usuarioExiste', async function(req, res){
    let respuesta 
    if (respuesta != undefined) {
        respuesta = await realizarQuery(`
            SELECT * FROM Usuarios WHERE usuario = ${req.body.usuario} or contraseña = ${req.body.contraseña}` )
        }
    console.log(respuesta)  
    res.send(respuesta)
})

app.get('/conseguirId', async function(req, res){
    let response
    response = await realizarQuery(`
        SELECT id FROM Usuarios Where usuario = ${req.body.usuario}`)
    console.log(response)
    res.send(response)
})

app.get('/esAdmin', async function(req, res){
    let respuesta 
    if (respuesta != undefined) {
        respuesta = await realizarQuery(`
            SELECT es_admin FROM Usuarios WHERE usuario = ${req.body.usuario}`)
        }  
    res.send(respuesta)
})





