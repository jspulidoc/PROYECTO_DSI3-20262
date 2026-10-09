export interface Alojamiento {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  ubicacion: string;
  tipo: string;
  capacidad: number;
  habitaciones: number;
  camas: number;
  banos: number;
  precioNoche: number;
  tarifaLimpieza: number;
  calificacion: number;
  activo: boolean;
  imagenPrincipal: string;
  imagenes: string[];
  servicios: string[];
  reglas: string[];
}

export interface Resena {
  id: number;
  alojamientoId: number;
  usuario: string;
  calificacion: number;
  comentario: string;
}

export interface MarketplaceData {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}
