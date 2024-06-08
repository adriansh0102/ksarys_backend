import { Response, Request } from 'express';

import { sendRes } from '../../../../helpers/send.res';
import { CustomResponse } from '../../../../helpers/checkAuth';
import { ComandaDetallesQuerys } from '../query/oferta-detalle.querys';
import { ComandaDetalles } from '../interface/comanda-detalle.interface';

export class ComandaDControllers {

  static async getAllCDetalles(req: Request, res: Response) {
    
    try {
      const sales = await ComandaDetallesQuerys('getAll', {IdComanda: req.params.id});
      return sendRes(res, 200, true, 'Datos Obtenidos', sales);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getComandaDetalleByComanda(req: Request, res: Response) {
    
    try {
      const sales = await ComandaDetallesQuerys('getComandaDetalleByComanda',
        { IdComanda: req.params.id });
      return sendRes(res, 200, true, 'Datos Obtenidos', sales);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getCDetallesById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const sales = await ComandaDetallesQuerys('SelectById', {Id: id});
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

  static async saveCDetalle(req: Request, res: CustomResponse) {
   
    try {

      const cdetalles: ComandaDetalles = req.body;

      await ComandaDetallesQuerys('Insert', cdetalles);
      return sendRes(res, 200, true, 'ComandaDetallesQuerys Creada Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteCDetalle (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      await ComandaDetallesQuerys('Eliminar', {Id: id});
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
      }
    }

  }

}