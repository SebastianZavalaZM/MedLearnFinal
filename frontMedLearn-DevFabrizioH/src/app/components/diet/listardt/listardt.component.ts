import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Diet } from '../../../models/Diet';
import { DietService } from '../../../services/diet.service';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listardt',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    CommonModule],
  templateUrl: './listardt.component.html',
  styleUrl: './listardt.component.css'
})
export class ListardtComponent implements OnInit{
  historial: boolean=false;
  idUser: number = 0;

  datasource: MatTableDataSource<Diet> = new MatTableDataSource();
  constructor(
    private dT: DietService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idUser = data['id'];
      this.historial = data['id'] != null;
    });

    if (this.historial) {
      this.dT.listTreatmentsByUserId(this.idUser).subscribe((data)=>{
        this.datasource=new MatTableDataSource(data)
      });
    } else{
      this.dT.list().subscribe((data)=>{
        this.datasource=new MatTableDataSource(data)
      });
    }

    this.dT.getList().subscribe((data)=>{
      this.datasource=new MatTableDataSource(data)
    });
  }

  delete(id:number){
    this.dT.delete(id).subscribe((data)=> {
      this.dT.list().subscribe((data)=> {
        this.dT.setList(data);
      });
    });
  }
  startDiet(diet: Diet): void {
    diet.startDayDiet = new Date(); // Captura la fecha actual al hacer clic
    this.dT.update(diet).subscribe(() => {
      console.log(`Dieta con ID ${diet.idDiet} inició el ${diet.startDayDiet}`);
      this.dT.list().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
      });
    });
  }

  finishDiet(diet: Diet): void {
    diet.finishDayDiet = new Date(); // Captura la fecha actual al hacer clic
    this.dT.update(diet).subscribe(() => {
      console.log(`Dieta con ID ${diet.idDiet} finalizó el ${diet.finishDayDiet}`);
      this.dT.list().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
      });
    });
  }

  addLike(diet: Diet): void {
    diet.qualificationDiet += 1;
    this.dT.update(diet).subscribe((data) => {
        console.log(`Dieta con ID ${diet.idDiet} recibió un like.`);
        this.dT.list().subscribe((data) => {
          this.datasource = new MatTableDataSource(data);
        });
      });
    }

    addDislike(diet: Diet): void {
      if (diet.qualificationDiet > 0) {
        diet.qualificationDiet -= 1;
        this.dT.update(diet).subscribe((data) => {
          console.log(`Dieta con ID ${diet.idDiet} recibió un dislike.`);
          this.dT.list().subscribe((data) => {
            this.datasource = new MatTableDataSource(data);
          });
        });
      }
    }

  }

