import { Routes } from '@angular/router';
import { cotizacionGuard } from './guards/cotizacion.guard';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReservaFormComponent } from './pages/reserva-form/reserva-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio · Oaziz' },
  { path: 'alojamientos', component: ListadoComponent, title: 'Alojamientos · Oaziz' },
  { path: 'alojamientos/:id', component: DetalleComponent, title: 'Detalle · Oaziz' },
  {
    path: 'alojamientos/:id/reservar',
    component: ReservaFormComponent,
    canActivate: [cotizacionGuard],
    title: 'Confirma tu reserva · Oaziz',
  },
  { path: 'reservas/confirmacion/:codigo', component: ConfirmacionComponent, title: 'Reserva confirmada · Oaziz' },
  { path: 'mis-reservas', component: MisReservasComponent, title: 'Mis reservas · Oaziz' },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada · Oaziz' },
];
