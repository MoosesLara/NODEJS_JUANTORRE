import express from "express";
import { formularioLogin, formularioRegistro } from "../controller/controller.js";

//VARIABLES
const router = express.Router();

//ROUTING
router.get('/login', formularioLogin);
router.get('/registro',formularioRegistro);



export default router