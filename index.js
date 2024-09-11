import express from 'express';
import router from './routes/routes.js';

//CREAR LA APP
const app = express();

//ROUTING
app.use('/',router);

//DEFINIR UN PUERTO Y ARRANCAR EL PROYECTO
const port = 3000;

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});