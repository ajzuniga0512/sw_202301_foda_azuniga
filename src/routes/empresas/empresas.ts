import express from 'express';
const router = express.Router();

import {Empresas} from '@libs/Empresas/Empresas';

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

/* router.get('/', (_req, res)=>{
    
});
*/

export default router;