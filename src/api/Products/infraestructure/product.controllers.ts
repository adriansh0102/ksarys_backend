import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { ProductsManager } from './product-querys';
import { Product } from '../interface/product.interface';
export class ProductsControllers {

  static async getAllProducts (req: Request, res: Response) {

    try {
      const products = await ProductsManager('SelectAll')
      return sendRes(res, 200, true, 'Datos Obtenidos', products);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getProductsById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Faltan datos para realizar esta acción', ''); 
    
      const user = await ProductsManager('SelectById', {Id: id});
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

  static async saveProduct(req: Request, res: Response) {
  
    try {

      const data: Product = req.body;
      const fetchedProduct: Product = await (await ProductsManager('SelectByName', { Nombre: data.Nombre })).at(0)

      if (fetchedProduct) {
        await ProductsManager('Update', data);
        return sendRes(res, 200, true, 'Usuario Editado Correctamente', '');
      }

      await ProductsManager('Insert', data);
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteProduct (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if (!id) return sendRes(res, 200, false, 'Faltan datos para realizar esta acción', ''); 
      
      console.log(id);
    
      await ProductsManager('Delete', {Id: id});
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

  static async changeActive(req: Request, res: Response) {
    try {

      const data: Product = req.body

      await ProductsManager('Erease', data);
      return sendRes(res, 200, true, 'Usuario Editado', '');

    } catch (error) {
      return sendRes(res, 500, false, 'Error Interno', '');
    }
  }

}