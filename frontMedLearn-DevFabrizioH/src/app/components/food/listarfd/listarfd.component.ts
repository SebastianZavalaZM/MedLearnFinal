import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'

import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Food } from '../../../models/Food';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-listarfd',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listarfd.component.html',
  styleUrl: './listarfd.component.css'
})
export class ListarfdComponent implements OnInit {
  datasource: MatTableDataSource<Food> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8','c9','c10','c11','accion01','accion02']
  constructor(private fS:FoodService){}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.fS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.fS.delete(id).subscribe((data)=>{
      this.fS.list().subscribe((data)=>{
        this.fS.setList(data);
        });
      });
    }

}
