import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { Sale } from '../interface/sales.interface';
import { SalesManager } from './sales-querys';

export class SalesControllers {

  static async getAllSales (req: Request, res: Response) {

    try {
      const sales = await SalesManager('SelectAll')
      return sendRes(res, 200, true, 'Datos Obtenidos', sales);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getSalesById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const sales = await SalesManager('SelectById', {Id: clientId});
      if (!sales) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 200, true, 'Resultado de la búsqueda', sales); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveSale(req: Request, res: Response) {
   
    try {

      let { IdAreaEntidad, Fecha, Mesa,  Personas,  IdDependiente, Observaciones, Descuento , Producto}  = req.body;
      
      const sale: Sale = {
        Numero: 6754668,
        IdAreaEntidad,
        Fecha,
        Mesa,
        Personas,
        IdDependiente,
        Observaciones: 'prueba cosa gorda',
        Descuento,
        Activo: true,
        Validado: true,
        Cerrado: false,
        IdUsuario: res.userData?.id,
        Id: ''
      }

      await SalesManager('Insert', sale);
      return sendRes(res, 200, true, 'Comanda Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteSale (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      console.log(id);
    
      await SalesManager('Delete', {Id: id});
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        console.log(error);
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
      }
    }

  }

}