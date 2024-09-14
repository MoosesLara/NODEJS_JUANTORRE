import express from "express";
import { formularioLogin, formularioOlvidePassword, formularioRegistro } from "../controller/controller.js";

//VARIABLES
const router = express.Router();

//ROUTING
router.get('/login', formularioLogin);
router.get('/registro',formularioRegistro);
router.get('/olvide-password',formularioOlvidePassword);



export default router