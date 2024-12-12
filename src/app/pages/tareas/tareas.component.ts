import { Component, OnInit } from '@angular/core';
import { Tarea, TareaServicios } from '../../servicios/tarea.servicios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
  imports: [FormsModule]
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  categoria: string = 'Pendientes';
  tareaEditada: Tarea | null = null;

  constructor(private tareaServicio: TareaServicios) {}

  ngOnInit(): void {
    this.mostrarTareas(); // Cargar tareas al inicio
  }

  // Mostrar todas las tareas
  mostrarTareas(): void {
    this.tareaServicio.obtenerTareas().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.tareas = data;
        } else {
          console.error('La respuesta no es un array:', data);
          this.tareas = []; // O manejar de otra manera si no es un array
        }
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
        this.tareas = []; // O alguna lógica para manejar el error
      }
    );
  }
  

  // Agregar una nueva tarea
  aniadirTarea(): void {
    if (this.nuevaTarea) {
      const nuevaTarea: Tarea = {
        id: "", // El id se asignará automáticamente en el servicio
        nombre: this.nuevaTarea,
        categoria: this.categoria,
        completada: false
      };
  
      this.tareaServicio.aniadirTarea(nuevaTarea).subscribe(
        (tareaAgregada) => {
          this.mostrarTareas();
          this.nuevaTarea = ''; // Limpiar el campo de entrada
        },
        (error) => {
          console.error('Error al agregar la tarea:', error);
        }
      );
    }
  }
  

  // Marcar una tarea como completada o no completada
  completarTarea(id: string, completada: boolean): void {
    this.tareaServicio.completarTarea(id, !completada).subscribe(() => {
      this.mostrarTareas(); // Actualizar la lista después de cambiar el estado de completada
    });
  }

  // Eliminar una tarea
  eliminarTarea(id: string): void {
    this.tareaServicio.eliminarTarea(id).subscribe(() => {
      this.mostrarTareas(); // Actualizar la lista después de eliminar una tarea
    });
  }

  // Editar una tarea (modificar)
  editarTarea(tarea: Tarea): void {
    this.tareaEditada = { ...tarea }; // Guardamos una copia de la tarea para editarla
  }

  // Guardar las modificaciones de una tarea
  guardarModificaciones(): void {
    if (this.tareaEditada) {
      this.tareaServicio.modificarTarea(this.tareaEditada).subscribe(() => {
        this.mostrarTareas(); // Actualizar la lista de tareas después de la modificación
        this.tareaEditada = null; // Limpiar el formulario de edición
      });
    }
  }
}
