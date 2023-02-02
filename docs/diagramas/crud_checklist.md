1) file structure
 - /src/lib/<entidad>/<entidad>.ts
  - definir la clase, interfaz
- carpeta /src/routes/<entidad>/<entidad>.ts
  - definir los endpoints usando express.Router y exportar la instancia del router
    - importar el router de la entidad y registrat el path (router.use)


Nota: son 5 endpoints y 5 metodos en la libreria
- getAll
- getById
- add
- update
- delete
