import { Treatments } from './../../../models/treatments';
import { name } from './../../../../../node_modules/@leichtgewicht/ip-codec/types/index.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';
import { Medicine } from '../../../models/Medicine';
import { TreatmentsService } from '../../../services/treatments.service';

@Component({
  selector: 'app-insertarmed',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule ,
    MatButtonModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertarmed.component.html',
  styleUrl: './insertarmed.component.css'
})
export class InsertarmedComponent implements OnInit {
  listaTratamientos: Treatments[] = [];
  form: FormGroup = new FormGroup({});
  medicina: Medicine = new Medicine();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private medS: MedicineService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private treatmentsS: TreatmentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tratamiento: ['', Validators.required],
    });
    this.cargarTratamientos();
  }

  cargarTratamientos(): void {
    this.treatmentsS.list().subscribe((data) => {
      this.listaTratamientos = data;
      console.log(this.listaTratamientos);
    });
  }

  insertar(): void {
    if (this.form.valid) {
      console.log('Formulario válido, procesando inserción...');
      this.medicina.idMedicine = this.form.value.codigo;
      this.medicina.nameMedicine = this.form.value.nombre;
      this.medicina.descriptionMedicine = this.form.value.descripcion;
      this.medicina.treatment = this.form.value.tratamiento;
      if (this.edicion) {
        console.log('Modo edición, actualizando medicina...');
        this.medS.update(this.medicina).subscribe((data) => {
          console.log('Medicina actualizada:', data);
          this.medS.list().subscribe((data) => {
            console.log('Lista de medicinas actualizada:', data);
            this.medS.setList(data);
            this.router.navigate(['Medicinas']);
          });
        });
      } else {
        console.log('Modo inserción, agregando nueva medicina...');
        this.medS.insert(this.medicina).subscribe((data) => {
          console.log('Nueva medicina insertada:', data);
          this.medS.list().subscribe((data) => {
            console.log('Lista de medicinas actualizada:', data);
            this.medS.setList(data);
            this.router.navigate(['Medicinas']);
          });
        });
      }
    } else {
      console.log('Formulario inválido, no se puede procesar la inserción.');
    }
  }

  init() {
    if (this.edicion) {
      this.medS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMedicine),
          nombre: new FormControl(data.nameMedicine),
          descripcion: new FormControl(data.descriptionMedicine),
          tratamiento: new FormControl(data.treatment),
        });
      });
    }
  }
}
