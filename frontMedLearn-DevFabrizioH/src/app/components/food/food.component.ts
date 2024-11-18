import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarfdComponent } from './listarfd/listarfd.component';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [RouterOutlet,ListarfdComponent],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  constructor(public route:ActivatedRoute){}
}
