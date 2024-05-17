import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { DPAManager } from './dpa-querys';

export class UsersControllers {

  static async getDPA100 (req: Request, res: Response) {

    try {
      const dpas = await DPAManager('Select')
      return sendRes(res, 200, true, 'Datos Obtenidos', dpas);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getAllDPA (req: Request, res: Response) {

    try {
      const dpas = await DPAManager('SelectAll')
      return sendRes(res, 200, true, 'Datos Obtenidos', dpas);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

}