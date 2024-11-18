import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Medicine } from '../../../models/Medicine';
import { MedicineService } from '../../../services/medicine.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarmed',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatCardModule, CommonModule],
  templateUrl: './listarmed.component.html',
  styleUrl: './listarmed.component.css'
})
export class ListarmedComponent {
  datasource: MatTableDataSource<Medicine> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];

  constructor(private medS: MedicineService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.medS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.medS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  delete(id: number): void {
    this.medS.delete(id).subscribe({
      next: () => {
        this.medS.list().subscribe((data) => {
          this.datasource = new MatTableDataSource(data);
        });
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.snackBar.open('No se puede porque esta conectadoa  otro dato ', 'Close', {
          duration: 5000,
        });
      }
    });
  }
}
