import { Response, Request } from "express";

import { sendRes } from "../../../../helpers/send.res";
import { Utensilios} from "./query";
import { Utensilio } from "../interface/utensilios.interface";

export class UtensiliosControllers {
  static async getAllUtensilios(req: Request, res: Response) {
    try {
     //no implementado
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(
          res,
          500,
          false,
          "Error Grave",
          "Internsl Server Error",
        );
      }
    }
  }

  static async AdicionarUtensilios (req: Request, res: Response) {

    const { 
      IdEntidad = '2500000000',
      IdTipo='2500000001' , 
      Nombre='',
      Cantidad=0,
      Precio=2222,
      Activo = true,
      Validado = 1,
      IdUsuario = '2500000000'
    } = req.body;

    const data:Utensilio = {IdEntidad, IdTipo, Nombre,Cantidad, Precio,Activo, Validado, IdUsuario};

    try {
    
      const result = await Utensilios("Insert" , data );
      return sendRes(res, 200, true, "Insertado Correctamente" , result );

    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error BD", error.message);
      } else {
        return sendRes(
          res,
          500,
          false,
          "Error Grave",
          "Internsl Server Error",
        );
      }
    }








  }
}
