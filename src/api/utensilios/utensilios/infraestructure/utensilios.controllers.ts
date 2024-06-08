import { Response, Request } from "express";

import { sendRes } from "../../../../helpers/send.res";
import { Utensilios} from "./query";
import { Utensilio } from "../interface/utensilios.interface";
 
export class UtensiliosControllers {
  
  static async getAllUtensilios(req: Request, res: Response) {

    let { Activo , Validado } = req.body;

    if( !Validado )   Validado = true;
    if( !Activo ) Activo = true;

    try {
     const result = await Utensilios("Select" , { Activo , Validado });
     return sendRes(res, 200, true, "GET All Ok" , result );
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
      Nombre='perdwwwwwwwwwwododod',
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

  static async putUtensilios(req: Request, res: Response){

    const { Id } = req.params; 
    let { Nombre , IdTipo , Precio , Cantidad , Validado } = req.body;

    try {
      const utensilio = await Utensilios('SelectId' , {Id});
      
      if( !Validado )   Validado = 1;
      if( !Nombre )     Nombre = utensilio[0].Nombre;
      if( !IdTipo )     IdTipo = utensilio[0].IdTipo;
      if( !Precio )     Precio = utensilio[0].Precio
      if( !Cantidad )   Cantidad = utensilio[0].Cantidad

      const tipo = await Utensilios('Update' ,{ Id  , Nombre , IdTipo ,Precio , Cantidad , Validado });
      return sendRes(res, 200, true, "Update ok", tipo);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async deleteUtensilios(req: Request, res: Response){

    try {
      const tipo = await Utensilios('Borrar' , { Id:  req.params.Id , Validado: 1} );
      return sendRes(res, 200, true, "Borrar ok", tipo);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }
}
