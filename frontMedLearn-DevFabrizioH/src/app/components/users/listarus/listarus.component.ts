import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarus',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule
  ],
  templateUrl: './listarus.component.html',
  styleUrl: './listarus.component.css'
})
export class ListarusComponent implements OnInit, AfterViewInit {

  datasource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5', 'c6', 'accion01'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsersService) {}

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.datasource.data = data;

      if (this.paginator) {
        this.datasource.paginator = this.paginator;
      }
    });

    this.uS.getList().subscribe((data) => {
      this.datasource.data = data;

      if (this.paginator) {
        this.datasource.paginator = this.paginator;
      }
    });
  }

}
