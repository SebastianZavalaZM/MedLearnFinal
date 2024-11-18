import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmedComponent } from "./listarmed/listarmed.component";

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [RouterOutlet, ListarmedComponent],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent {
  constructor(public route: ActivatedRoute) {}
}
