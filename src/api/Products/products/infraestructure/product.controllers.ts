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

<<<<<<< Updated upstream
=======
  static async getAllProductsTable(req: Request, res: CustomResponse) {


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
>>>>>>> Stashed changes

  //no se que hace esta consulta
  static async getProductsById(req: Request, res: Response) {

    let { Id } = req.params;

    console.log('aaaaaaaaaaaaaaaaaaaaa');
    
    
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

    let { 
      Codigo ,
      Nombre ,
      IdUm ,
      IdClasificacion ,
      IdEntidad ,
      IdAlmacen ,
      InventarioInicial2 ,
      IdConcepto ,
      FactorConversion 
    } = req.body;

    const product  = {
      Codigo,
      Nombre,
      IdUm,
      IdClasificacion,
      IdEntidad,
      IdAlmacen,
      InventarioInicial2,
<<<<<<< Updated upstream
      Activo: false,
      Validado: 0,
      IdUsuario: '',
=======
      Activo: true,
      Validado: 1,
      IdUsuario: res.userData?.id,
      IdEntidad :res.entity,
>>>>>>> Stashed changes
      IdConcepto,
      FactorConversion,
    }

    try {
      const productNew = await Products('Insert', product );
      return sendRes(res, 200, true, "Nuevo Producto", productNew);
    } catch (error) {
      if (error instanceof Error) {
        return sendRes(res, 500, false, "Error Grave", error.message);
      } else {
        return sendRes(res, 500, false, "Error Grave", "");
      }
    }
  }

  static async deleteProduct(req: Request, res: Response) {

  }

  
}
