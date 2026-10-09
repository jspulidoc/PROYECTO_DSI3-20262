export type EstadoReserva = 'CONFIRMADA' | 'CANCELADA';

export interface Reserva {
  codigo: string; 
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  llegada: string;
  salida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: string;
  correo: string;
  estado: EstadoReserva;
  fechaCreacion: string;
}
