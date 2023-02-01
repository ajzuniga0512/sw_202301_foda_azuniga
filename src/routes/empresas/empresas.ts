import express from 'express';
const router = express.Router();

import {Empresas, IEmpresa} from '@libs/Empresas/Empresas';

const empresasModel= new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi Empresa',
    status: 'Activo',
    created: undefined,
    updated: undefined
});

//registrar los endpoint en router
router.get('/', (_req, res)=>{
    const jsonUrls= {
        "getAll": {"method": "get", "url": "empresas/all"},
        "getById": {"method": "get", "url": "empresas/byid/:id"},
        "new": {"method": "post", "url": "empresas/new"},
        "update": {"method": "put", "url": "empresas/upd/:id"},
        "delete": {"method": "delete", "url": "empresas/del/:id"},
    }
    res.status(200).json(jsonUrls);

});

/* req lo solicitud que pide el cliente 
   res la respuesta que le da el servidor */

/* - no se encuentra el recurso 404    
- si tiene un error que no hemos manejado devuelve el status 500*/

router.get('/all', (_req, res)=>{
    res.status(200).json(empresasModel.getAll());
});

router.post('/new', (req, res) =>{
    console.log("Empresas /new request body:", req.body);

    const {
        nombre="Alejandro Zuniga", 
        status="Activo"
    } = req.body;

    const newEmpresa: IEmpresa = {
        codigo: "",
        nombre,
        status,
        created: undefined,
        updated: undefined
    };

    if(empresasModel.add(newEmpresa)) {
        return res.status(200).json({"created":true});
    }

    return res.status(404).json({"error": "Al agregar una nueva empresa"});

});

router.put('/upd/:id', (req, res)=>{
    const { id } = req.params;

    const {
        nombre="Alejandro Zuniga", 
        status="Activo", 
        observacion=""
        
    }=req.body;
    
    const updateEmpresa : IEmpresa = {
        codigo: id,
        nombre,
        status,
        observacion,
        created: undefined,
        updated: undefined
    };

    if (empresasModel.update(updateEmpresa)) {
        return res.status(200).json({"Se cambio": "Se actualizo la empresa"});
    }

    return res.status(404).json({"error": "Al actualizar la empresa"});


    
});

/* router.get('/', (_req, res)=>{
    
});
*/

export default router;