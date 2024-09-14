

//FUNCION FORMULARIO
const formularioLogin = (req, res)=>{
    res.render('auth/login',{
        
    });
};

//FUNCION REGISTRO
const formularioRegistro = (req, res) =>{
    res.render('auth/registro',{

    });
};

export{
    formularioLogin,
    formularioRegistro
}