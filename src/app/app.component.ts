import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, PrincipalComponent, HttpClientModule]
})
export class AppComponent {
  title = 'gestiontienda';
}
