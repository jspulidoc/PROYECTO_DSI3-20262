import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoCardComponent } from '../../components/alojamiento-card/alojamiento-card.component';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

interface GrupoCiudad {
  ciudad: string;
  items: Alojamiento[];
}

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [ReactiveFormsModule, AlojamientoCardComponent],
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private service = inject(AlojamientoService);

  todos: Alojamiento[] = [];
  resultados: Alojamiento[] = [];
  grupos: GrupoCiudad[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];
  opcionesHuespedes: number[] = [];
  opcionesPrecio = [200000, 300000, 400000, 500000, 700000];
  cargando = true;

  filtros = this.fb.nonNullable.group({
    ciudad: '',
    huespedes: '',
    tipo: '',
    precioMax: '',
  });

  ngOnInit(): void {
    this.service.getAlojamientos().subscribe(lista => {
      this.todos = lista;
      this.ciudades = [...new Set(lista.map(a => a.ciudad))].sort();
      this.tipos = [...new Set(lista.map(a => a.tipo))].sort();
      const maxCapacidad = Math.max(...lista.map(a => a.capacidad));
      this.opcionesHuespedes = Array.from({ length: maxCapacidad }, (_, i) => i + 1);
      this.grupos = this.agruparPorCiudad(lista);

      const params = this.route.snapshot.queryParamMap;
      this.filtros.patchValue(
        { ciudad: params.get('ciudad') ?? '', huespedes: params.get('huespedes') ?? '' },
        { emitEvent: false }
      );
      this.aplicarFiltros();
      this.cargando = false;
    });

    
    this.filtros.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  hayFiltros(): boolean {
    return Object.values(this.filtros.getRawValue()).some(valor => valor !== '');
  }

  aplicarFiltros(): void {
    const { ciudad, huespedes, tipo, precioMax } = this.filtros.getRawValue();
    this.resultados = this.todos.filter(
      a =>
        (!ciudad || a.ciudad === ciudad) &&
        (!huespedes || a.capacidad >= Number(huespedes)) &&
        (!tipo || a.tipo === tipo) &&
        (!precioMax || a.precioNoche <= Number(precioMax))
    );
  }

  limpiarFiltros(): void {
    this.filtros.reset(); 
  }

  volver(): void {
    this.location.back();
  }

  private agruparPorCiudad(lista: Alojamiento[]): GrupoCiudad[] {
    return this.ciudades.map(ciudad => ({
      ciudad,
      items: lista.filter(a => a.ciudad === ciudad),
    }));
  }
}
