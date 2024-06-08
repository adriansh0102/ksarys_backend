import { Response, Request } from "express";

import { CuentasContables } from "./cuentaContable-query";
import { sendRes } from "../../../../helpers/send.res";
import { CuentasContable } from "../interface/cuentaContable.interface";

export class CuentasContablesControllers {

  static async getAllCuentasContables(req: Request, res: Response) {
    try {
        const { Activo } = req.params;
      const utensilios = await CuentasContables("Select" ,{ Activo});
      return sendRes(res, 200, true, "Datos Obtenidos", utensilios);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async addCuentasContables(req: Request, res: Response) {
    const { Cuenta , SubCuenta , Nombre , IdTipo } = req.body;

    if (!Nombre || !Cuenta || !IdTipo )
      return sendRes(
        res,
        400,
        false,
        "Bad Request",
        "falta alguno de estos datos { Nombre, Cuenta , IdTipo}"
      );

    const data:CuentasContable = {
      Cuenta,
      Nombre,
      SubCuenta: (SubCuenta) ? SubCuenta : '',
      IdTipo,
      Activo: true,
      IdUsuario : '2500000000',
    };

    try {
      const tipo = await CuentasContables("Insert", data);
      return sendRes(res, 200, true, "Datos Obtenidos", tipo);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async updateCuentasContables(req: Request, res: Response) {
    const { Id } = req.params;
    const { Nombre , Cuenta, SubCuenta, IdTipo} = req.body;

    
    try {

      const cuentaContables = await CuentasContables('SelectId' , { Id})

      const data = {
        Id,
        Nombre: ( Nombre ) ?  Nombre : cuentaContables[0].Nombre , 
        Cuenta: ( Cuenta ) ? Cuenta  : cuentaContables[0].Cuenta , 
        SubCuenta: ( SubCuenta ) ?  SubCuenta : cuentaContables[0].SubCuenta, 
        IdTipo :( IdTipo ) ? IdTipo  : cuentaContables[0].IdTipo
      }

      const tipo = await CuentasContables("Update", data);
      return sendRes(res, 200, true, "Update ok", tipo);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async deleteCuentasContables(req: Request, res: Response) {
    try {
      const tipo = await CuentasContables("Borrar", { Id: req.params.Id });
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
