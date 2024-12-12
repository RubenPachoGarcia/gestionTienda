import { Component } from '@angular/core';
import { Tarea, TareaServicios } from '../../servicios/tarea.servicios';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {
  opciones: string[] = ['Pendientes', 'Completadas', 'NO realizadas'];  
  opcionSeleccionada: string | null = null;  
  tareasFiltradas: Tarea[] = [];

  constructor(private tareaServicio: TareaServicios) {}
 
  seleccionarOpcion(opcion: string): void {  
    this.opcionSeleccionada = opcion;
    this.tareaServicio.obtenerTareas().subscribe(
      (tareas) => {
        if (Array.isArray(tareas)) {
          this.tareasFiltradas = tareas.filter((t) => t.categoria === opcion);
        } else {
          console.error('La respuesta no es un array:', tareas);
        }
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }
  
  completarTarea(id: string, completada: boolean): void {
    this.tareaServicio.completarTarea(id, !completada).subscribe(() => {
      this.actualizarTareas();
    });
  }

  eliminarTarea(id: string): void {
    this.tareaServicio.eliminarTarea(id).subscribe(() => {
      this.actualizarTareas();
    });
  }

  private actualizarTareas(): void {
    if (this.opcionSeleccionada) {
      this.seleccionarOpcion(this.opcionSeleccionada); 
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackById(index: number, tarea: Tarea): string {
    return tarea.id;
  }
}
