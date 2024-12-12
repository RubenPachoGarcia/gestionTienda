import { Injectable } from '@angular/core';
import { map, Observable, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Tarea {
  id: string;
  nombre: string;
  categoria: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class TareaServicios {
  private apiUrl = 'http://localhost:3000/tareas';  

  constructor(private http: HttpClient) {}
  
  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  obtenerUltimaId(): Observable<string> {
    return this.http.get<Tarea[]>(this.apiUrl).pipe(
      map(tareas => {
        const maxId = tareas.length > 0 ? Math.max(...tareas.map(t => parseInt(t.id))) : 0;
        return (maxId + 1).toString();  
      })
    );
  }

  aniadirTarea(tarea: Tarea): Observable<Tarea> {
    return this.obtenerUltimaId().pipe(
      map((ultimaId) => {
        tarea.id = ultimaId; 
        return tarea;
      }),
      switchMap((tareaConId) => this.http.post<Tarea>(this.apiUrl, tareaConId))
    );
  }

  eliminarTarea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  completarTarea(id: string, completada: boolean): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completada });
  }

  modificarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
}
