import express from 'express';
const router = express.Router();

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

router.get('/all', (_req, res)=>{
    res.status(200).json({'msg': 'Not Implemented yet'});
});

/* router.get('/', (_req, res)=>{
    
});
*/

export default router;