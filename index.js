import express from 'express';


//CREAR LA APP
const app = express();

//ROUTING
app.get('/', function(req, res){
    res.send('Hola Mundo en express');
});

app.get('/objeto', function(req, res){
    res.json({mgs: 'Hola Mundo en express'});
});

app.get('/nosotros', function(req, res){
    res.send('ruta de nosotros');
});

//DEFINIR UN PUERTO Y ARRANCAR EL PROYECTO
const port = 3000;

app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});