import { Response, Request } from "express";

import { sendRes } from "../../../../helpers/send.res";
import { ConceptoManager } from "./concepto-query";
import { Concepto } from "../interface/concepto.interface";

export class ConceptoControllers {

  static async getAllConcepto(req: Request, res: Response) {
    try {
        const data: Concepto = {
            Id: '',
            Nombre:'',
            Activo: true,
            Validado: true,
            IdUsuario: '2500000000'
        }
        const result = await ConceptoManager('Select', data)
        return sendRes(res, 200, true, "Peticion Get Ok" , result );

    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }
  static async addConcepto(req: Request, res: Response) {
    try {
      
        const { Nombre = ''} = req.body; 

        const data: Concepto= {
            Id: '',
            Nombre,
            Activo: true,
            Validado: true,
            IdUsuario: '2500000000'
        }
        const result = await ConceptoManager('Insert' , data)
        return sendRes(res, 200, true, "Insertado Correctamente" , result );

    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }

  static async updateConcepto(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const { Nombre , Validado } = req.body;

      if( !Nombre ) sendRes(res, 400, false, "Faltan Datos { Nombre }", undefined)

      const data: Concepto = {
        Id,
        Nombre,
        Validado: (Validado) ? Validado: true
      }
      const result = await ConceptoManager("Update", data);
      return sendRes(res, 200, true, "Actualizado Correctamente", result);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }

  static async deleteConcepto(req: Request, res: Response) {
    try {
      const { Id } = req.params;

      if( !Id) sendRes(res, 400, false, "Faltan Datos { Id }", undefined);
 
      const data: Concepto = {
        Id,
        Validado: true,
      };
      const result = await ConceptoManager("Borrar", data);
      return sendRes(res, 200, true, "Borrado Correctamente", result);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }
}
