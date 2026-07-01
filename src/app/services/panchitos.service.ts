import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config';

export interface Pancho {
  panchoId?: string;
  nombre: string;
  pan: string;
  salchicha: string;
  ingredientes: string;
  precio: number;
  tamaño: string;
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class PanchosService {

  private url = `${API_URL}/panchos`;

  constructor(private http: HttpClient) {}

  listarPanchos(): Observable<{ total: number; panchos: Pancho[] }> {
    return this.http.get<{ total: number; panchos: Pancho[] }>(this.url);
  }

  obtenerPancho(id: string): Observable<Pancho> {
    return this.http.get<Pancho>(`${this.url}/${id}`);
  }

  crearPancho(pancho: Pancho): Observable<Pancho> {
    return this.http.post<Pancho>(this.url, pancho);
  }

  actualizarPancho(id: string, pancho: Partial<Pancho>): Observable<Pancho> {
    return this.http.put<Pancho>(`${this.url}/${id}`, pancho);
  }

  borrarPancho(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}