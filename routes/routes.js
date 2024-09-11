import express from "express";


const router = express.Router();

//ROUTING
router.get('/', (req, res)=>{
    res.json({mgs: 'Repuesta tipo GET'});
});

router.post('/', (req, res)=>{
    res.json({msg:'Respuesta tipo POST'});
});


export default router