import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {TreatmentsService} from '../../../services/treatments.service';
import {Treatments} from '../../../models/treatments';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardTitle} from '@angular/material/card';
import {elements} from 'chart.js';
@Component({
  selector: 'app-listartr',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, CommonModule, MatCardTitle],
  templateUrl: './listartr.component.html',
  styleUrl: './listartr.component.css'
})
export class ListartrComponent implements OnInit{
  //datasource: MatTableDataSource<Treatments> = new MatTableDataSource();
  //displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5','c6','accion02']
  datasource :Treatments[] = [];
  constructor(private tS: TreatmentsService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.datasource= data;
    });
    this.tS.getList().subscribe((data)=>{
      this.datasource= data;
    });
  }

  protected readonly elements = elements;
}
