import express from 'express';
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import router from '../bienes_raices_mvc/routes/usuarioRoutes.js';
import db from './config/db.js'

//CREAR LA APP
const app = express();

//HABILITAR LECTURA
app.use(express.urlencoded({extended: true}));

//HABILITAR COOKIE PARSE
app.use( cookieParser())

//HABILITAR CSRF
app.use( csrf({cookie: true}) )

//CONEXION A LA BASE DE DATOS
try{
    await db.authenticate();
    db.sync();
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
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});

