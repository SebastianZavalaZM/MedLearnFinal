import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Exercise } from '../../../models/Exercise';
import { ExerciseService } from '../../../services/exercise.service';


@Component({
  selector: 'app-listarex',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarex.component.html',
  styleUrls: ['./listarex.component.css']
})
export class ListarexComponent implements OnInit {
  datasource: MatTableDataSource<Exercise> = new MatTableDataSource();
  displayedColumns: string[] = ['idExercise', 'nameExercise', 'setsExercise', 'diet', 'accion01', 'accion02'];


  constructor(private eS: ExerciseService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  loadExercises() {
    this.eS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.loadExercises(); // Recarga la lista después de eliminar
    });
  }
}
