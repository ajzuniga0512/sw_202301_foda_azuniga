export interface IUsuarios{
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string[];
    creado: Date;
    ultimoAcceso: Date;
    observacion?: string; 
}

export class Usuarios{

    private usuarios: IUsuarios[];
    constructor(){
        this.usuarios = [];
    }
    add(nuevoUsuario: IUsuarios){
        const date = new Date();
        const nueva: IUsuarios = {
            ...nuevoUsuario,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            creado: date,
            ultimoAcceso: date
        }

        this.usuarios.push(nueva);
        return true;
    }

    getAll(){
        return this.usuarios;
    }

    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });

        return usuarioToReturn;
    }

    update(updateUsuario: IUsuarios){
        let updated = false;
       const newUsuarios: IUsuarios[] = this.usuarios.map((usu)=>{
        if (usu.codigo === updateUsuario.codigo){
            return {...usu, ...updateUsuario, updated: new Date()};
        }
        return usu;

       });
       this.usuarios= newUsuarios;
       return updated;

    }

    delete(codigo:string){
       const usuarioToDelete = this.usuarios.find((usu)=>{
        return usu.codigo === codigo;
       }); 

       if(usuarioToDelete){
        const newUsuarios: IUsuarios[] = this.usuarios.filter((usu)=>{
            return usu.codigo !== codigo;
        });
        this.usuarios = newUsuarios;
        return true;
       }

       return false;
    }
}