import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { Dependents } from '../interface/dependents.interface';
import { DependentsManager } from './dependents-querys';

export class DependentsControllers {

  static async getAllDependents (req: Request, res: Response) {

    try {
      const dependents = await DependentsManager('Select')
      return sendRes(res, 200, true, 'Datos Obtenidos', dependents);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getDependentsById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const dependent = await DependentsManager('SelectById', {Id: id});
      if (!dependent) return sendRes(res, 200, false, 'Dependiente no encontrado', ''); 
      
      return sendRes(res, 200, true, 'Resultado de la búsqueda', dependent); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveDependents(req: Request, res: Response) {
  
    try {

      const data: Dependents = req.body;
      const fetchedDependents: Dependents = await (await DependentsManager('SelectByName', { Nombre: data.Nombre })).at(0)

      if (fetchedDependents) {
        await DependentsManager('Update', data);
        return sendRes(res, 200, true, 'Usuario Editado Correctamente', '');
      }

      await DependentsManager('Insert', data);
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteDependents (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      await DependentsManager('Delete', {Id: id});
      return sendRes(res, 200, true, 'Dependiente Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
      }
    }

  }

  static async changeActive(req: Request, res: Response) {
    try {

      const data: Dependents = req.body

      await DependentsManager('Erease', data);
      return sendRes(res, 200, true, 'Usuario Editado', '');

    } catch (error) {
      return sendRes(res, 500, false, 'Error Interno', '');
    }
  }

}