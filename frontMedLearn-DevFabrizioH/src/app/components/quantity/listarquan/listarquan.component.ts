import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Quantity } from '../../../models/Quantity';
import { QuantityService } from '../../../services/quantity.service';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listarquan',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule, MatCardModule, CommonModule],
  templateUrl: './listarquan.component.html',
  styleUrl: './listarquan.component.css'
})
export class ListarquanComponent {
  datasource: MatTableDataSource<Quantity> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5']

  constructor(private quanS:QuantityService){}


  ngOnInit(): void {
    this.quanS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.quanS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }






}
