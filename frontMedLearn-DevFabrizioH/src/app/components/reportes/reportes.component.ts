import { Component } from '@angular/core';
import { NumberdietinityfinComponent } from "./numberdietinityfin/numberdietinityfin.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NumberdietinityfinComponent, RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
