import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule, MatCardModule, CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'

})
export class ListarComponent implements OnInit{
  datasource: MatTableDataSource<Illness> = new MatTableDataSource();

  constructor(private iS:IllnessService, private router: Router){}


  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.loadImagesFromIndexedDB();
    });
    this.iS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.loadImagesFromIndexedDB();
    });
  }

  loadImagesFromIndexedDB() {
    const request = indexedDB.open('ImageStore', 1);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('images', 'readonly');
      const store = transaction.objectStore('images');

      this.datasource.data.forEach((element) => {
        const getRequest = store.get(element.imageIllness);

        getRequest.onsuccess = (e: any) => {
          const result = e.target.result;
          if (result) {
            // Asigna el Data URL de la imagen desde IndexedDB
            element.imageIllness = result.data;
          }
        };
      });
    };

    request.onerror = (event) => {
      console.error('Error al abrir IndexedDB:', event);
    };
  }

  eliminar(id: number) {
    this.iS.delete(id).subscribe((data)=>{
      this.iS.list().subscribe((data)=>{
        this.iS.setList(data);
        });
      },
      (error) => {
        if (error.status === 500) {
          alert("No se puede eliminar la enfermedad porque está asociada a una dieta. Elimine la dieta primero.");
        } else {
          alert("Ocurrió un error al intentar eliminar la enfermedad.");
        }
      }
    );
    }


}
