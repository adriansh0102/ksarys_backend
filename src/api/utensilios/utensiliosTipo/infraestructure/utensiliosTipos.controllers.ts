import { Response, Request } from "express";
import { sendRes } from "../../../../helpers/send.res";
import { UtensiliosTipos } from "./utensiliosTypos.query";

export class UtensiliosTiposControllers {
  static async getAllUtensiliosTipos(req: Request, res: Response) {
    try {
      const users = await UtensiliosTipos("Select");
      return sendRes(res, 200, true, "Datos Obtenidos", users);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async SaveAllUtensiliosTipos(req: Request, res: Response) {

    const { Nombre } = req.body;

    if( !Nombre )  return sendRes(res, 400, false, "Bad Request", "El nombre es Oblidatorio");

    const data = {
      Id: '',
      Nombre,
      Activo: true,
      IdUsuario: '2500000000'
    }
    
    
    try {
      const tipo = await UtensiliosTipos('Insert' , data );
      return sendRes(res, 200, true, "Datos Obtenidos", tipo);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }
}
