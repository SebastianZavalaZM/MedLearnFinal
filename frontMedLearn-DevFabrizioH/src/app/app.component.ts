import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IllnessComponent } from './components/illness/illness.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    IllnessComponent,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontMedLearn';
  role: string = '';
  username: string = '';
  iduser: number = 0;
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {

    this.role = this.loginService.showRole();
    this.username = this.loginService.showUser();
    this.iduser = this.loginService.showIdUser();
    return this.loginService.verificar();
  }
  isPaciente() {
    return this.role === 'PACIENTE' || 'ADMINISTRADOR';
  }
  isDoctor() {
    return this.role === 'DOCTOR' || 'ADMINISTRADOR';
  }
  isNutricionista() {
    return this.role === 'NUTRICIONISTA' || 'ADMINISTRADOR';
  }
  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

}
