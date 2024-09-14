import express from 'express';
import router from './routes/routes.js';
import db from './config/db.js'

//CREAR LA APP
const app = express();

//CONEXION A LA BASE DE DATOS
try{
    await db.authenticate();
    console.log('Conexion Correcta a la base de datos');
} catch (error){
    console.log(error)
}
 
//CARPETA PUBLICA
app.use(express.static('public'))

//ROUTING
app.use('/auth',router);

//HABILITAR PUG
app.set('view engine', 'pug');
app.set('views', './views');

//DEFINIR UN PUERTO Y ARRANCAR EL PROYECTO
const port = 3000;

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});