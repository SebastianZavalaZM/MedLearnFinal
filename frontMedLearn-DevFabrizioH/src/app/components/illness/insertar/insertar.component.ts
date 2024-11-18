import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from '@angular/forms';
 import { ActivatedRoute, Params, Router  } from '@angular/router';
 import { MatInputModule } from '@angular/material/input';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatSelectModule } from '@angular/material/select';
 import { MatButtonModule } from '@angular/material/button';
import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertar',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './insertar.component.html',
  styleUrl: './insertar.component.css'
})
export class InsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  fileName: string = '';
  imageURL: string | ArrayBuffer | null = null;
  illness: Illness = new Illness();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private iS: IllnessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log('Modo edición:', this.edicion);
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      hnombre: ['',Validators.required],
      hdescripcion: ['',Validators.required],
      himage: ['',Validators.required],
      hcontador: ['', Validators.required],
    });
  }

  insertar(): void {
    console.log('Formulario válido:', this.form.valid);
    if (this.form.valid) {
      this.illness.idIllness = this.form.value.codigo;
      this.illness.nameIllness = this.form.value.hnombre;
      this.illness.descriptionIllness = this.form.value.hdescripcion;
      this.illness.imageIllness = this.form.value.himage;
      this.illness.searchesIllneses = this.form.value.hcontador;

      if (this.edicion) {
        this.iS.update(this.illness).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        this.iS.insert(this.illness).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      console.log('Datos enviados:', this.illness);
    }
    this.router.navigate(['Enfermedades']);
  }

  init(): void {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idIllness),
          hnombre: new FormControl(data.nameIllness),
          hdescripcion: new FormControl(data.descriptionIllness),
          himage: new FormControl(data.imageIllness),
          hcontador: new FormControl(data.searchesIllneses),
        });
      });
    }
  }

  // En el método onFileSelected
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
      this.fileName = this.normalizeFileName(file.name); // Normaliza el nombre del archivo
      this.form.get('himage')!.setValue(this.fileName); // Establece el nombre del archivo en el campo `himage`

      const reader = new FileReader();
      reader.onload = () => {
          this.imageURL = reader.result; // Previsualización de la imagen
          this.storeImageInIndexedDB(file); // Almacenar en IndexedDB
      };
      reader.readAsDataURL(file);
  }
}


// Almacena la imagen en IndexedDB
storeImageInIndexedDB(file: File) {
  const reader = new FileReader();

  reader.onload = (e: any) => {
      const fileData = e.target.result;

      // Abre la base de datos después de que el archivo se haya cargado
      const request = indexedDB.open('ImageStore', 1);

      request.onupgradeneeded = (event: any) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('images')) {
              db.createObjectStore('images', { keyPath: 'name' });
          }
      };

      request.onsuccess = (event: any) => {
          const db = event.target.result;
          const transaction = db.transaction('images', 'readwrite');
          const store = transaction.objectStore('images');

          store.put({ name: this.fileName, data: fileData }); // Guarda la imagen en IndexedDB
          transaction.oncomplete = () => {
              console.log(`Imagen "${this.fileName}" almacenada en IndexedDB`);
          };

          transaction.onerror = (err:Event) => {
              console.error('Error al almacenar la imagen en IndexedDB:', err);
          };
      };

      request.onerror = (event) => {
          console.error('Error al abrir IndexedDB:', event);
      };
  };

  reader.readAsDataURL(file); // Lee el archivo antes de abrir la transacción
}



  normalizeFileName(fileName: string): string {
    return fileName
      .toLowerCase()                // Convierte a minúsculas
      .replace(/[^a-z0-9.]/g, '-')  // Reemplaza caracteres especiales con guiones
      .replace(/-+/g, '-');         // Reemplaza múltiples guiones seguidos con uno solo
  }
}
