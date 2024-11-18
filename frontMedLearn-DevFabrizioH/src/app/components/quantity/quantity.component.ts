import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarquanComponent } from './listarquan/listarquan.component';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [RouterOutlet, ListarquanComponent],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.css'
})
export class QuantityComponent {
  constructor(public route:ActivatedRoute){}

}
