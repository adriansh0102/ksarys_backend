export interface Sale {
  Id?: string;
  Numero?: number;
  IdAreaEntidad?: number;
  Fecha?: Date;
  Mesa?: number;
  Personas?: number;
  IdDependiente?: number;
  Observaciones?: string;
  Descuento?: number;
  Activo?: boolean;
  Validado?: boolean;
  Cerrado?: boolean;
  IdUsuario?: number;
}