import { Component } from '@angular/core';
import { ListarusComponent } from "./listarus/listarus.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, ListarusComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public route: ActivatedRoute){}
}
