import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-illness',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './illness.component.html',
  styleUrl: './illness.component.css'
})

export class IllnessComponent {
  constructor(public route:ActivatedRoute){}
}
