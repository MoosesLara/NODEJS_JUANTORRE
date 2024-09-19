import {check, validationResult} from 'express-validator';
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/token.js'
import {emailRegistro} from '../helpers/email.js'
import { where } from 'sequelize';
import csurf from 'csurf';

//FUNCION FORMULARIO
const formularioLogin = (req, res)=>{
    res.render('auth/login',{
        pagina:'Iniciar Sesion'
    });
};

//FUNCION REGISTRO
const formularioRegistro = (req, res) =>{
    res.render('auth/registro',{
        pagina:'Crear Cuenta',
        csrfToken: req.csrfToken()
    });
};

//REGISTRAR
const registrar = async (req, res) =>{
    //VALIDACION DE FORMULARIO
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('El valor ingresado no es un email valido').run(req)
    await check('password').isLength({min:6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Los passwords no son iguales').run(req)
    
    //VERIFICA QUE EL RESULTADO ESTE VACIO
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        //ERRORES
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        
        })

    }    

    //EXTRAER DATOS
    const {nombre, email, password } = req.body

    //VERIFICAR QUE EL USUARIO NO ESTE DUPLICADO
    const existeUsuario = await Usuario.findOne({ where : {email}})

    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg:'El Usuario ya esta Registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }        
        })
    }

    //ALMACENAR UN USUARIO
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    //ENVIA EMAIL DE CONFIRMACION
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //MOSTRAR MENSAJE DE CONFIRMACION
    res.render('templates/mensaje',{
        pagina:'Cuenta Creada Correctamente',
        mensaje:'Hemos enviado un Email de confirmacion, presiona en el enlace'
    })
}

//FUNCION COMPRUEBA CUENTA
const confirmar = async (req, res, next) => {
    const { token } = req.params

    //VERIFICAR SI EL TOKEN ES VALIDO
    const usuario = await Usuario.findOne({ where: {token}})
    
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina:'Error al confirmar tu cuenta',
            mensaje:'Hubo un error al confirmar tu cuenta, intente de nuevo',
            error: true
        })
    }

    //CONFIRMAR LA CUENTA
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina:'Cuenta Confirmada',
        mensaje:'La cuenta se confirmo Correctamente'
    })

    next();
}


//FUNCION OLVIDE PASSWORD
const formularioOlvidePassword = (req, res) =>{
    res.render('auth/olvide-password',{
        pagina:'Recupera tu acceso a Bienes Raices'
    });
};

export{
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
}