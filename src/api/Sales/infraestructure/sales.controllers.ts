import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { Sale } from '../interface/sales.interface';
import { SalesManager } from './sales-querys';
import { CustomResponse } from '../../../helpers/checkAuth';

export class SalesControllers {

  static async getAllSales(req: Request, res: Response) {
    
    try {
      let sales = await SalesManager('SelectAll');
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

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const sales = await SalesManager('SelectById', {Id: id});
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

  static async saveSale(req: Request, res: CustomResponse) {
   
    try {

      const sale: Sale = req.body;

      sale.Numero = generateRandomNumber();
      sale.IdAreaEntidad = res.area;
      sale.IdUsuario = res.userData?.id

      await SalesManager('Insert', sale);
      return sendRes(res, 200, true, 'Comanda Creada Exitosamente', '');
      
    } catch (error) {
      console.log(error);
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

function generateRandomNumber(): number {
    // Genera un número aleatorio entre 10000 y 99999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;

    // Formatea el número para asegurar que comienza con '6754'
    const formattedNumber = `675${randomNumber}`;

    return parseInt(formattedNumber, 10);
}