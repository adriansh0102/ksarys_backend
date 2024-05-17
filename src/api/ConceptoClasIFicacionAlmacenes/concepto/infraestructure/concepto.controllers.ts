import { Response, Request } from "express";

import { sendRes } from "../../../../helpers/send.res";
import { ConceptoManager } from "./concepto-query";
import { Concepto } from "../interface/concepto.interface";

export class ConceptoControllers {
  static async AdicionarConcepto(req: Request, res: Response) {
    try {
      
        const { Nombre = ''} = req.body; 

        const data: Concepto= {
            id: '',
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
}
