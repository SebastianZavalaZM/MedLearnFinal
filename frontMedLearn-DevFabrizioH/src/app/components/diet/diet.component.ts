import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardtComponent } from "./listardt/listardt.component";

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [RouterOutlet, ListardtComponent],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent {
  constructor(public route:ActivatedRoute) {}
}
