import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarexComponent } from "./listarex/listarex.component";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [RouterOutlet, ListarexComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {
  constructor(public route:ActivatedRoute){}
}
