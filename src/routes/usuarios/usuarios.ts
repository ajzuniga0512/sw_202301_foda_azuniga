import express from 'express';
const router = express.Router();
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsuarios } from '@dao/models/Usuarios/IUsuarios';
import { Usuarios } from '@libs/Usuarios/Usuarios';
const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel:Usuarios;
usuariosDao.init().then(()=>{
  usuariosModel = new Usuarios(usuariosDao);
});

router.get('/all', async (_req, res) => {
    res.status(200).json(await usuariosModel.getAll());
  });
  
  router.get('/byid/:id', async (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = await usuariosModel.getById(codigo);
    if(usuario){
      return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontró Usuario"});
  });
  
  router.post('/new', async (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
      codigo = "P-146",
      correo = "josuezuniga05@hotmailcom",
      nombre ="Alejandro",
      password = "holasw2023"
    } = req.body;
    //TODO: Validar Entrada de datos
    const newUsuarios: IUsuarios = {
        codigo,
        correo,
        nombre,
        password
    };
    if (await usuariosModel.add(newUsuarios)) {
      return res.status(200).json({"created": true});
    }
    return res.status(404).json(
      {"error": "Error al agregar un nuevo usuario"}
    );
  });
  
  router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const {
      correo="----NotRecieved------",
      nombre="----NotRecieved------",
      password = "----NotRecieved------",
      codigo = "",
    } = req.body;
  
    if (
      nombre === "----NotRecieved------"
      || correo === "----NotRecieved------" || password === "----NotRecieved------"
    ) {
      return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
    }
    const UpdateUsuario : IUsuarios = {
      codigo,
      correo,
      nombre,
      password
      
      
    };
  
    if (await usuariosModel.update(id, UpdateUsuario)) {
      return res
        .status(200)
        .json({"updated": true});
    }
    return res
      .status(404)
      .json(
        {
          "error": "Error al actualizar el usuario"
        }
      );
  });
  
  router.delete('/del/:id', async (req, res)=>{
    const {id } = req.params;
    if(await usuariosModel.delete(id)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
  });
  
  
  export default router;
  