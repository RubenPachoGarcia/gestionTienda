import { Routes } from '@angular/router';
import { TareasComponent } from './pages/tareas/tareas.component';
import { OpcionesComponent } from './pages/opciones/opciones.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'tareas', component: TareasComponent },
];
