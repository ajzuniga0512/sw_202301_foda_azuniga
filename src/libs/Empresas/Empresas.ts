export interface IEmpresa{
    codigo: string;
    nombre: string;
    status: string;
    created: Date;
    updated: Date;
    observacion?: string; /*El signo de interrogacion significa que puede que venga pero tambien puede que no*/
}

export class Empresas {

    private empresas: IEmpresa[];
    constructor(){
        this.empresas = [];
    }
    add(nuevaEmpresa: IEmpresa){
        const date = new Date();
        const nueva: IEmpresa = {
        ...nuevaEmpresa,
        codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
        created: date,
        updated: date
    
    
    }
    this.empresas.push(nueva);
    return true;

    }
    getAll(){
        return this.empresas;
    }

    update(updateEmpresa: IEmpresa){
       const newEmpresas: IEmpresa[] = this.empresas.map((emp)=>{
        if (emp.codigo === updateEmpresa.codigo){
            return {...emp, ...updateEmpresa, updated: new Date()};
        }
        return emp;

       });
       this.empresas= newEmpresas;
       return true;

    }

}