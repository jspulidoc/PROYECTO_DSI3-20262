import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlojamientoCardComponent } from '../../components/alojamiento-card/alojamiento-card.component';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, AlojamientoCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private service = inject(AlojamientoService);

  destacados: Alojamiento[] = [];
  ciudades: string[] = [];
  opcionesHuespedes: number[] = [];
  cargando = true;

  busqueda = this.fb.nonNullable.group({ ciudad: '', huespedes: '' });

  ngOnInit(): void {
    this.service.getAlojamientos().subscribe(lista => {
      // Destacados = los 4 mejor calificados
      this.destacados = [...lista].sort((a, b) => b.calificacion - a.calificacion).slice(0, 4);
      this.ciudades = [...new Set(lista.map(a => a.ciudad))].sort();
      const maxCapacidad = Math.max(...lista.map(a => a.capacidad));
      this.opcionesHuespedes = Array.from({ length: maxCapacidad }, (_, i) => i + 1);
      this.cargando = false;
    });
  }

  /** Lleva al listado con los datos del buscador ya aplicados como filtros. */
  buscar(): void {
    const { ciudad, huespedes } = this.busqueda.getRawValue();
    const queryParams: Record<string, string> = {};
    if (ciudad) queryParams['ciudad'] = ciudad;
    if (huespedes) queryParams['huespedes'] = huespedes;
    this.router.navigate(['/alojamientos'], { queryParams });
  }
}
