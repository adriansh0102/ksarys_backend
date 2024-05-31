export interface Sale {
  Id?: string;
  Numero?: number;
  IdAreaEntidad?: string;
  Fecha?: string;
  Mesa?: number;
  Personas?: number;
  IdDependiente?: string;
  Observaciones?: string;
  Descuento?: number;
  Activo?: boolean;
  Validado?: boolean;
  Cerrado?: boolean;
  IdUsuario?: string;
}

// export interface Sale {
//   Id: string;
//   Numero: number;
//   IdAreaEntidad: string;
//   Fecha: string;
//   Mesa: number;
//   Personas: number;
//   IdDependiente: string;
//   Observaciones: string;
//   Descuento: number;
//   Activo: boolean;
//   Validado: boolean;
//   Cerrado: boolean;
//   IdUsuario: string;
// }