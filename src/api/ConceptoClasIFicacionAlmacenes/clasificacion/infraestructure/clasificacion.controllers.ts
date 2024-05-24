import { Response, Request } from "express";

import { sendRes } from "../../../../helpers/send.res";
import { Clasificacion } from "../interface/clasificacion.interface";
import { ClasificacionManager } from "./clasificacion-query";
export class ClasificacionControllers {

  
  static async getClasificacion(req: Request, res: Response) {
    try {
      const { Activo = true, Validado=true } = req.body;

      const result = await ClasificacionManager("Select", {Activo, Validado});

      return sendRes(res, 200, true, "GET Ok", result);
      
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }

  static async addClasificacion(req: Request, res: Response) {
    try {
      const { Nombre = "", IdConcepto = "" } = req.body;

      const data: Clasificacion = {
        Id: "",
        Nombre,
        Activo: true,
        Validado: true,
        IdUsuario: "2500000000",
        IdConcepto,
      };
      const result = await ClasificacionManager("Insert", data);
      return sendRes(res, 200, true, "Insertado Correctamente", result);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }

  static async updateClasificacion(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const { Nombre, IdConcepto , Validado } = req.body;

      if( !IdConcepto ) sendRes(res, 400, false, "Faltan Datos { IdConcepto }", []);

      const data: Clasificacion = {
        Id,
        Nombre: (Nombre)? Nombre:'',
        IdConcepto,
        Validado: (Validado)? Validado: true
      }
      const result = await ClasificacionManager("Update", data);
      return sendRes(res, 200, true, "Actualizado Correctamente", result);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "Internsl Server Error");
      }
    }
  }

  static async deleteClasificacion(req: Request, res: Response) {
    try {
      const { Id } = req.params;

      if( !Id) sendRes(res, 400, false, "Faltan Datos { Id }", undefined);
 
      const data: Clasificacion = {
        Id,
        Validado: true,
      };
      const result = await ClasificacionManager("Borrar", data);
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
