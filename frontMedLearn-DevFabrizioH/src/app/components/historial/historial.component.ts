import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HistorialdietasComponent } from './historialdietas/historialdietas.component';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [RouterOutlet, HistorialdietasComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  constructor(public route:ActivatedRoute) {}

}
