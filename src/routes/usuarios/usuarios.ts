import express from 'express';
const router = express.Router();

import {IUsuarios, Usuarios} from '@libs/Usuarios/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo: 'josuezuniga05@hotmail.com',
    nombre: 'Alejandro',
    password: 'holaquetal',
    roles: 'Gerente',
    creado: undefined,
    ultimoAcceso: undefined
});

router.get('/', (_req, res)=>{
    const jsonUrls= {
        "getAll": {"method": "get", "url": "usuarios/all"},
        "getById": {"method": "get", "url": "usuarios/byid/:id"},
        "new": {"method": "post", "url": "usuarios/new"},
        "update": {"method": "put", "url": "usuarios/upd/:id"},
        "delete": {"method": "delete", "url": "usuarios/del/:id"},
    }
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res)=>{
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
    const {id: codigo} = req.params;
    const usuario= usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error": "No se encontro el usuario"});
});

router.post('/new', (req, res) =>{
    console.log("Usuarios /new request body:", req.body);

    const {
        correo= "josuezuniga05@hotmail.com",
        nombre="Alejandro", 
        password="holaquetal",
        roles="Gerente"
    } = req.body;

    const newUsuarios: IUsuarios = {
        codigo: "",
        correo,
        nombre,
        password,
        roles,
        creado: undefined,
        ultimoAcceso: undefined
    };

    if(usuariosModel.add(newUsuarios)) {
        return res.status(200).json({"created":true});
    }

    return res.status(404).json({"error": "Al agregar un nuevo usuario"});

});

router.put('/upd/:id', (req, res)=>{
    const { id } = req.params;

    const {
        correo= "josuezuniga05@hotmail.com",
        nombre="Alejandro", 
        password="holaquetal",
        roles="Gerente"
    } = req.body;

    const updateUsuario: IUsuarios = {
        codigo: id,
        correo,
        nombre,
        password,
        roles,
        creado: undefined,
        ultimoAcceso: undefined
    };

    if (usuariosModel.update(updateUsuario)) {
        return res.status(200).json({"Updated":true });
    }

    return res.status(404).json({"error": "Al actualizar el usuario"});
  
});

router.delete('/del/:id', (req, res)=>{
    const {id: codigo } = req.params; 

    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});

    }

    return res.status(404).json({"error": "No se pudo eliminar el usuario"});
});



export default router;