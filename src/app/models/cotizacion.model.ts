export interface Cotizacion {
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  llegada: string; // formato AAAA-MM-DD
  salida: string;  // formato AAAA-MM-DD
  huespedes: number;
  noches: number;
  precioNoche: number;
  subtotal: number;       // noches x precio por noche
  tarifaLimpieza: number; // definida por cada alojamiento
  tarifaServicio: number; // 10 % del subtotal
  total: number;          // subtotal + limpieza + servicio
}

export interface ErroresCotizacion {
  llegada?: string;
  salida?: string;
  huespedes?: string;
  general?: string;
}
