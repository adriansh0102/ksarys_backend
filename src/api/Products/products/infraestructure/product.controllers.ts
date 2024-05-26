import { Response, Request } from 'express';

import { sendRes } from '../../../../helpers/send.res';
import { Product } from '../interface/product.interface';
import { ProductsRouter } from '../router/product.router';
import { Products } from './product-query';
import { CLIENT_RENEG_LIMIT } from 'tls';


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

  static async saveProduct(req: Request, res: Response) {
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
      IdAlmacen,
      InventarioInicial2,
      Activo: true,
      Validado: 1,
      IdUsuario: '2500000000',
      IdEntidad :'2500000000',
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

  static async updateProduct(req: Request, res: Response) {

    let { Id } = req.params;

    const id = Number.parseInt(Id);

    const {
      IdFacturaProveedor,
      Codigo,
      Nombre,
      IdUm,
      IdClasificacion,
      IdConcepto,
      IdAlmacen,
      Cantidad,
      Importe,
      FactorConversion,
    } = req.body;

    const data ={
      Id:id,
      IdFacturaProveedor,
      Codigo,
      Nombre,
      IdUm,
      IdClasificacion,
      IdConcepto,
      IdAlmacen,
      Activo: true,
      Validado: 1,
      Cantidad,
      Importe,
      FactorConversion,
      

    }


    try {
      const product = await Products("Update", data );
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