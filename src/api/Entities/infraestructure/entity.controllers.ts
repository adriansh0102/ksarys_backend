import e, { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { Entity } from '../interface/entity.interface';
import { GestionUsuarios } from './entity-querys';

export class EntityControllers {

  static async getAllEntities (req: Request, res: Response) {

    try {
      const entity = await GestionUsuarios('Select')
      return sendRes(res, 200, true, 'Datos Obtenidos', entity);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getEntitiesById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const user = await GestionUsuarios('SelectById', {ID: clientId});
      if (!user) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 500, false, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveEntity(req: Request, res: Response) {
  
    try {

      const data: Entity = req.body;
      const fetchedEntity: Entity = await (await GestionUsuarios('SelectByName', { Nombre: data.Nombre })).at(0)

      if (fetchedEntity) {
        await GestionUsuarios('Update', data);
        return sendRes(res, 200, true, 'Usuario Editado Correctamente', '');
      }

      await GestionUsuarios('Insert', data);
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteEntity (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      console.log(id);
    
      await GestionUsuarios('Delete', {ID: id});
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