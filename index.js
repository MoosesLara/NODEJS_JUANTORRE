import express from 'express';
import router from './routes/routes.js';

//CREAR LA APP
const app = express();

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