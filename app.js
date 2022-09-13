
//Conexion con el cluster, aqui es un puerto local para ir corroborando que se recibe senal
//Esta es la contrasena de Mongo Atlas en una constante, esto nos va a permitir hacer conexion desde el codigo
//const uri = `mongodb+srv://AdminOptica:${password}@optic-data.dprsg9t.mongodb.net/?retryWrites=true&w=majority`;
//El URI es basicamente el link de nuestro cluster y le agregamos nuestra constante para hacer un "inicio de sesion"
//Aqui basicamente el then y catch se encargan de hacer el intento de conexion, si todo sale bien, nos muestra el mensaje de arriba y sino, nos salta
//error  
const express = require("express");
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const password = "MmsAGGwTp1NqMgmA"
const uri = `mongodb+srv://AdminOptica:${process.env.PASSWORD}@optic-data.dprsg9t.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri,
   { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(()=> console.log('Conectado a Mongodb')) 
  .catch(e => console.log('error de conexión', e))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Middlewares
app.use(express.static(__dirname + "/public"))

app.use('/', require('./router/ruta'))
app.use('/Clientes', require('./router/clientes'));
app.use('/Actividad_Usos', require('./router/actividad_usos'))
app.use('/Examenes', require('./router/examenes'))
app.use('/Lensometria_S', require('./router/lensometria_s'))
app.use('/Refracciones_Kr_8000', require('./router/refracciones_kr_8000'))
app.use('/Refracciones_De', require('./router/refracciones_de'))
app.use('/Revisiones_Clientes', require('./router/revisiones_clientes'))
app.use('/Estrategias', require('./router/estrategias'))

app.get("/", (req, res) => {
  res.render("index", {titulo : "mi titulo dinamico"});
});

//Estas son todas las rutas que el formulario va a estar usando
app.get('/Clientes', (rea, res) =>{
  res.render("Clientes", {tituloServicios : "Datos clientes"});
})
app.get('Actividad_Usos', (rea,res) =>{
  res.render("Actividad_Usos", {tituloActividad : "Datos Actividad_Uso"})
})
app.get('Examenes', (rea,res) =>{
  res.render("Examenes", {tituloActividad : "Datos Examen"})
})
app.get('Lensometria_S', (rea,res) =>{
  res.render("Lensometria_S", {tituloActividad : "Datos Lensometria"})
})
app.get('Refracciones_Kr_8000', (rea,res) =>{
  res.render("Refracciones_Kr_8000", {tituloActividad : "Datos Refracciones Kr 8000"})
})
app.get('Refracciones_De', (rea,res) =>{
  res.render("Refracciones_De", {tituloActividad : "Datos Refracciones Definitivas"})
})
app.get('Revisiones_Clientes', (rea,res) =>{
  res.render("Revisiones_Clienntes", {tituloActividad : "Datos de las revisiones de los clientes"})
})
app.get('Estrategias', (rea,res) =>{
  res.render("Estrategias", {tituloActividad : "Datos de las estrategias utilizadas"})
})

app.use((req, res, next) =>{
  res.status(404).render("404", {
    tituloError : "Error 404",
    descripcion : "Page not found"
  })
})

app.listen(port, () => {
  console.log(`The app is being listened at http://localhost:${port}`);
});
