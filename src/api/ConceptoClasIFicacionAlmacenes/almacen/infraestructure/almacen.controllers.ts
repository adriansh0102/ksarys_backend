import { Response, Request } from "express";
import { Almacen } from "../interface/almacen.interface";
import { AlmacenesManager } from "./almacen-query";
import { sendRes } from "../../../../helpers/send.res";


export class AlmacenControllers {

    static async getAllAlmacen(req: Request, res: Response) {
        try {
            const result = await AlmacenesManager('SelectAll')
            return sendRes(res, 200, true, "Peticion Get Ok" , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }

    }
    
    //TODO:Revisar la implementacion de la query haber lo que hace 
    static async getAlmacen(req: Request, res: Response) {
        try {
      
            const { Validado, IdEntidad , IdAreaEntidad} = req.body;
            
            //IdEntidad si viene-> busca por este id

            // if( !IdAreaEntidad || !IdEntidad ) return sendRes(res, 400, false, "Faltan datos" , [] );
    
            const data: Almacen = {
                Activo: true,
                Validado: (Validado) ? Validado : true,
                IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                IdAreaEntidad
            }
            const result = await AlmacenesManager('Select' , data)
            return sendRes(res, 200, true, "Peticion Get Ok"  , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }
    }

    static async addAlmacen(req: Request, res: Response) {
        try {
      
            const { Codigo,Nombre,Validado,IdEntidad  } = req.body; 

            if( !Codigo || !IdEntidad || !Nombre) return sendRes(res, 400, false, "Faltan datos" , [] );
    
            const data: Almacen = {
                Codigo,
                Nombre,
                Activo: true,
                Validado: (Validado) ? Validado : true,
                IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                IdUsuario: '2500000000'
            }
            const result = await AlmacenesManager('Insert' , data)
            return sendRes(res, 200, true, "Insertado Correctamente" , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }
    }

    static async UpdateAlmacen(req: Request, res: Response) {
        try {
            const { Id } = req.params;
            const { Nombre,Validado,IdEntidad  } = req.body; 

            if( !IdEntidad || !Nombre ) return sendRes(res, 400, false, "Faltan datos" , [] );
    
            const data: Almacen = {
                Id,
                Nombre,
                Activo: true,
                Validado: (Validado) ? Validado : true,
                IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                IdUsuario: '2500000000'
            }
            const result = await AlmacenesManager('Update' , data)
            return sendRes(res, 200, true, "Actualizado Correctamente" , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }
    }

    static async deleteAlmacen(req: Request, res: Response) {
        try {
            
            const result = await AlmacenesManager('Borrar' , {Id: req.params.Id , Validado : req.body.Validado})
            return sendRes(res, 200, true, "Borrado Correctamente" , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }
    }
}