import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from '@angular/forms';
 import { ActivatedRoute, Params, Router, RouterLink  } from '@angular/router';
 import { MatInputModule } from '@angular/material/input';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatSelectModule } from '@angular/material/select';
 import { MatButtonModule } from '@angular/material/button';
import { Food } from '../../../models/Food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { Diet } from '../../../models/Diet';
import { DietService } from '../../../services/diet.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
@Component({
  selector: 'app-insertarfd',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    RouterLink],
  templateUrl: './insertarfd.component.html',
  styleUrls: ['./insertarfd.component.css'],
})
export class InsertarfdComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  food: Food = new Food();
  id: number = 0;
  edicion: boolean = false;
  listaDietas: Diet[] = [];

  constructor(
    private foodService: FoodService,
    private dietService: DietService,
    private formBuilder: FormBuilder,
    public  router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Componente InsertarFoodComponent inicializado');
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log('Modo edición:', this.edicion);
      this.init();
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      portion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      typeQuantity: ['', Validators.required],
      proteins: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fats: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      carbohydrates: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fiber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cholesterol: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sodium: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      diet: ['', Validators.required]
    });

    this.dietService.list().subscribe((data) => {
      this.listaDietas = data;
      console.log('Lista de Dietas cargada:', this.listaDietas);
    });
  }

  insertar(): void {
    console.log('Formulario válido:', this.form.valid);
    if (this.form.valid) {
      console.log('Valores del formulario:', this.form.value);

      this.food.nameFood = this.form.value.name;
      this.food.portionFood = this.form.value.portion;
      this.food.typeQuantityFood = this.form.value.typeQuantity;
      this.food.proteinsFood = this.form.value.proteins;
      this.food.fatsFood = this.form.value.fats;
      this.food.carbohydratesFood = this.form.value.carbohydrates;
      this.food.fiberFood = this.form.value.fiber;
      this.food.cholesterolFood = this.form.value.cholesterol;
      this.food.sodiumFood = this.form.value.sodium;
      this.food.diet = new Diet();
      this.food.diet.idDiet = this.form.value.diet;

      console.log('Objeto Food preparado para insertar/actualizar:', this.food);

      if (this.edicion) {
        console.log('Modo edición, llamando a FoodService.update()');
        this.foodService.update(this.food).subscribe((data) => {
          console.log('Respuesta de update:', data);
          this.foodService.list().subscribe((data) => {
            this.foodService.setList(data);
          });
        });
      } else {
        console.log('Modo creación, llamando a FoodService.insert()');
        this.foodService.insert(this.food).subscribe((data) => {
          console.log('Respuesta de insert:', data);
          this.foodService.list().subscribe((data) => {
            this.foodService.setList(data);
          });
        });
      }
    } else {
      console.warn('Formulario no válido, verifique los errores.');
    }

    this.router.navigate(['Alimentos']);
  }

  init() {
    if (this.edicion) {
      console.log('Inicializando el formulario en modo edición para ID:', this.id);
      this.foodService.listId(this.id).subscribe((data) => {
        console.log('Datos recibidos para edición:', data);
        this.form = new FormGroup({
          name: new FormControl(data.nameFood, Validators.required),
          portion: new FormControl(data.portionFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          typeQuantity: new FormControl(data.typeQuantityFood, Validators.required),
          proteins: new FormControl(data.proteinsFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          fats: new FormControl(data.fatsFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          carbohydrates: new FormControl(data.carbohydratesFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          fiber: new FormControl(data.fiberFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          cholesterol: new FormControl(data.cholesterolFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          sodium: new FormControl(data.sodiumFood, [Validators.required, Validators.pattern('^[0-9]+$')]),
          diet: new FormControl(data.diet.idDiet, Validators.required)
        });
      });
    }
  }

}
