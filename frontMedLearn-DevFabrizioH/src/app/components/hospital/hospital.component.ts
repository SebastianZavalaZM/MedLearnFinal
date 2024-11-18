import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhpComponent } from './listarhp/listarhp.component';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [RouterOutlet, ListarhpComponent],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent {
  constructor(public route:ActivatedRoute) {}
}
