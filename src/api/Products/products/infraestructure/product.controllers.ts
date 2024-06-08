import { Response, Request } from 'express';

import { sendRes } from '../../../../helpers/send.res';
import { Product } from '../interface/product.interface';
import { ProductsRouter } from '../router/product.router';
import { Products } from './product-query';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { CustomResponse } from '../../../../helpers/checkAuth';


export class ProductsControllers {

  static async getAllProducts(req: Request, res: Response) {

    const { Activo = true, Validado = 1 } = req.query;

    const {  IdEntidad='' } = req.body;
  
    try {
      const products = await Products("Select", { Activo, IdEntidad, Validado });
      return sendRes(res, 200, true, "Productos Obtenidos", products);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async getAllProductsTable(req: Request, res: Response) {

    try {
      const products = await Products("SelectTable");
      return sendRes(res, 200, true, "Productos Obtenidos", products);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }
  static async getProductsSelect(req: Request, res: Response) {

    try {
      const products = await Products("SelectSelect");
      return sendRes(res, 200, true, "Productos Select Obtenidos", products);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  //no se que hace esta consulta
  static async getProductsById(req: Request, res: Response) {

    let { Id } = req.params;

    try {
      const product = await Products('SelectOneId', { Id });
      return sendRes(res, 200, true, "Producto Obtenido", product);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async saveProduct(req: Request, res: CustomResponse) {

    try {

      let prod: Product = req.body;

      prod.IdEntidad = res.entity!;
      prod.IdUsuario = res.userData?.id!;

      const productNew = await Products('Insert', prod );
      return sendRes(res, 200, true, "Nuevo Producto", productNew);

    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async updateProduct(req: Request, res: Response) {

    try {
      
      const prod: Product = req.body;
      const product = await Products("Update", prod );
      return sendRes(res, 200, true, "Productos Actualizado", product);
      
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async deleteProduct(req: Request, res: Response) {

    let { Validado } = req.body;
    const { Id } = req.params;

    if( !Validado ) Validado = 1 

    try {
      const product = await Products("Borrar", { Id ,Activo: false , Validado});
      return sendRes(res, 200, true, "Productos Borrado", product);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  
}
