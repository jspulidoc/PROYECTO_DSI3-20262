export interface Cotizacion {
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  llegada: string; 
  salida: string;  
  huespedes: number;
  noches: number;
  precioNoche: number;
  subtotal: number;      
  tarifaLimpieza: number;
  tarifaServicio: number; 
  total: number;          
}

export interface ErroresCotizacion {
  llegada?: string;
  salida?: string;
  huespedes?: string;
  general?: string;
}
