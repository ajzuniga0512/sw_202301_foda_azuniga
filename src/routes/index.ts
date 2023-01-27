import express from 'express';
const router  = express.Router();
//REST API
//Internet -> HTTP -> REST API -> DB
//SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave: valor }
// valor: texto, numerico, booleano, array [valores], objeto {llave:valor}  

//REST stateless, resource unique representation
// CRUD Create, Read, Update, Delete
//      POST, GET, PUT, DELETE   85-92

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (req, res)=>{
 const version: string = "1.0.0";
 const jsonResp= {"name":"FODA Be", "version": version};
 //string, number, boolean, types, interfaces, classes, enumerators
 res.json(jsonResp);
 });

 //router.get router.post router.put router.delete router.use

export default router;
