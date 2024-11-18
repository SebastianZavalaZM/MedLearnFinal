import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ListartrComponent} from './listartr/listartr.component';

@Component({
  selector: 'app-treatments',
  standalone: true,
  imports: [
    RouterOutlet,
    ListartrComponent
  ],
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent {
  constructor(public route:ActivatedRoute) {}
}
