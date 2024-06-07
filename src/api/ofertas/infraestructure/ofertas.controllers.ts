
import { Response, Request } from "express";
import { Ofertas } from "./ofertas-query";
import { sendRes } from "../../../helpers/send.res";

export class OfertasControllers {

  static async getAllOfertas(req: Request, res: Response) {
    try {
      const utensilios = await Ofertas("SelectAll");
      return sendRes(res, 200, true, "Datos Obtenidos", utensilios);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

}

