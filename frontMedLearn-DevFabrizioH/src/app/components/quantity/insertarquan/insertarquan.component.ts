import { Quantity } from '../../../models/Quantity';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuantityService } from '../../../services/quantity.service';
import { Medicine } from '../../../models/Medicine';
import { MedicineService } from '../../../services/medicine.service';
import { Food } from '../../../models/Food';
import { Exercise } from '../../../models/Exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-insertarquan',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './insertarquan.component.html',
  styleUrls: ['./insertarquan.component.css']
})
export class InsertarquanComponent implements OnInit {
  listaMedicinas: Medicine[] = [];
  listaComida: Food[] = [];
  ListaEjercicios: Exercise[] = [];
  form: FormGroup = new FormGroup({});
  Quantity: Quantity = new Quantity();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private quanS: QuantityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicneS: MedicineService,
    private foodS: FoodService,
    private exerciseS: ExerciseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      cantidad: ['', Validators.required],
      medicina: ['', Validators.required],
      comida: ['', Validators.required],
      ejercicio: ['', Validators.required],
    });

    this.medicneS.list().subscribe((data) => {
      this.listaMedicinas = data;
    });
    this.foodS.list().subscribe((data) => {
      this.listaComida = data;
    });
    this.exerciseS.list().subscribe((data) => {
      this.ListaEjercicios = data;
    });
  }

  insertar(): void {
    console.log('Insertar method called');
    if (this.form.valid) {
      console.log('Form is valid');
      this.Quantity.quantityQuantity = this.form.value.cantidad;
      this.Quantity.medicine = this.form.value.medicina;
      this.Quantity.food = this.form.value.comida;
      this.Quantity.exercise = this.form.value.ejercicio;
      console.log('Quantity object populated:', this.Quantity);

      if (this.edicion) {
        this.Quantity.idQuantity = this.id; // Set the id for update
        console.log('Editing existing quantity');
        this.quanS.update(this.Quantity).subscribe((data) => {
          console.log('Update response:', data);
          this.quanS.list().subscribe((data) => {
            console.log('Updated list:', data);
            this.quanS.setList(data);
          });
        });
      } else {
        console.log('Inserting new quantity');
        this.quanS.insert(this.Quantity).subscribe((data) => {
          console.log('Insert response:', data);
          this.quanS.list().subscribe((data) => {
            console.log('New list:', data);
            this.quanS.setList(data);
          });
        });
      }
    } else {
      console.log('Form is invalid');
    }
    this.router.navigate(['Cantidades']);
    console.log('Navigation to Cantidades');
  }

  init() {
    if (this.edicion) {
      this.quanS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idQuantity,
          cantidad: data.quantityQuantity,
          medicina: data.medicine,
          comida: data.food,
          ejercicio: data.exercise,
        });
      });
    }
  }
}
