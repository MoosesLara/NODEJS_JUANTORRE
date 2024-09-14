

//FUNCION FORMULARIO
const formularioLogin = (req, res)=>{
    res.render('auth/login',{
        pagina:'Iniciar Sesion'
    });
};

//FUNCION REGISTRO
const formularioRegistro = (req, res) =>{
    res.render('auth/registro',{
        pagina:'Crear Cuenta'
    });
};


//FUNCION OLVIDE PASSWORD
const formularioOlvidePassword = (req, res) =>{
    res.render('auth/olvide-password',{
        pagina:'Recupera tu acceso a Bienes Raices'
    });
};



export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword
}