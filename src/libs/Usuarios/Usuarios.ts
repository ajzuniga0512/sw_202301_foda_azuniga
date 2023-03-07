import { IUsuarios } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Usuarios {
  private usuarios: IUsuarios[];
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
    this.usuarios = [];
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevoUsuario: IUsuarios) {
    const date = new Date();
    const nueva: IUsuarios = {
      ...nuevoUsuario,
      creado: date,
      ultimoAcceso: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateUsuario: IUsuarios) {
    const updateObject = { ...updateUsuario, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}