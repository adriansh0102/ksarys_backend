import { Response, Request } from "express";
import { sendRes } from "../../../helpers/send.res";
import { MeasureManager } from "./measure-query";


export class MeansureControllers {

    static async getAllMeansure(req: Request, res: Response) {
        try {
            const result = await MeasureManager ('Select', { Activo: true })
            return sendRes(res, 200, true, "Peticion Get Ok" , result );
    
        } catch (error) {
          if (error instanceof Error) {
            return sendRes(res, 500, false, "Error Grave", error.message);
          } else {
            return sendRes(res, 500, false, "Error Grave", "Internal Server Error");
          }
        }
    }
}