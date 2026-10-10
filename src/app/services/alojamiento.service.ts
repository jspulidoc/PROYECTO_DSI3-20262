import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Alojamiento, MarketplaceData, Resena } from '../models/alojamiento.model';

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private http = inject(HttpClient);
  private datos$?: Observable<MarketplaceData>;

  private cargarDatos(): Observable<MarketplaceData> {
    if (!this.datos$) {
      this.datos$ = this.http
        .get<MarketplaceData>('data/marketplace-data.json')
        .pipe(shareReplay(1)); // se descarga una sola vez
    }
    return this.datos$;
  }

  getAlojamientos(): Observable<Alojamiento[]> {
    return this.cargarDatos().pipe(map(d => d.alojamientos.filter(a => a.activo)));
  }

  getPorId(id: number): Observable<Alojamiento | undefined> {
    return this.getAlojamientos().pipe(map(lista => lista.find(a => a.id === id)));
  }

  getResenas(alojamientoId: number): Observable<Resena[]> {
    return this.cargarDatos().pipe(
      map(d => d.resenas.filter(r => r.alojamientoId === alojamientoId))
    );
  }
}
