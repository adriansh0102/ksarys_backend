import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { User } from '../interface/user.interface';
import { UsersManager } from './users-querys';

export class UsersControllers {

  static async getAllUsers (req: Request, res: Response) {

    try {
      const users = await UsersManager('Select')
      return sendRes(res, 200, true, 'Datos Obtenidos', users);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getUsersById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const user = await UsersManager('SelectById', {ID: clientId});
      if (!user) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 200, true, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveUser(req: Request, res: Response) {
  
    try {

      const data: User = req.body;
      const fetchedUser: User = await (await UsersManager('SelectByName', { Nombre: data.Nombre })).at(0)

      if (fetchedUser) {
        await UsersManager('Update', data);
        return sendRes(res, 200, true, 'Usuario Editado Correctamente', '');
      }

      const hashPassword = bcrypt.hashSync(data.ClaveAcceso!, 10);
      data.ClaveAcceso = hashPassword;

      await UsersManager('Insert', data);
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }
  
  static async sign(req: Request, res: Response) {
    
    try {
      
      const { username, password , entity, area } = req.body;
      const user: User = await (await UsersManager('SelectByName', { Nombre: username })).at(0)

      if (!user) {
        return sendRes(res, 200, false, 'Ese usuario no está registrado en nuestro sistema', '');
      }

      const compare = bcrypt.compareSync(password, user!.ClaveAcceso!.trim());
      if (!compare) return sendRes(
        res,
        200,
        false,
        'Contraseña incorrecta', '');

      const token = jwt.sign(
        {
          username: user.Nombre,
          user_id: user.ID,
          enable: user.Activo,
          entity,
          area
        },
        process.env.JWT_KEY_APP!,
        { expiresIn: '1d' }
      )
    
      return sendRes(res, 200, true, 'Inicio de sesión correcto', {
        user: {
          userID: user.ID,
          role: user.Cargo!.toLocaleLowerCase()
        },
        token,
        entity
      });
      
    } catch (error) { return sendRes(res, 500, false, 'mess_0', ''); }

  }

  static async deleteUser (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      await UsersManager('Delete', {ID: id});
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

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

      const data: User = req.body

      await UsersManager('Erease', data);
      return sendRes(res, 200, true, 'Usuario Editado', '');

    } catch (error) {
      return sendRes(res, 500, false, 'Error Interno', '');
    }
  }

}