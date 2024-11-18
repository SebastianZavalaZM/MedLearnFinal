import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Exercise } from '../../../models/Exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { DietService } from '../../../services/diet.service';
import { Diet } from '../../../models/Diet';

@Component({
  selector: 'app-insertarex',
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
  templateUrl: './insertarex.component.html',
  styleUrl: './insertarex.component.css'
})
export class InsertarexComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  exercise: Exercise = new Exercise();
  id: number = 0;
  edicion: boolean = false;
  listaDietas: Diet[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private dietService: DietService,
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Componente InsertExerciseComponent inicializado');
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log('Modo edición:', this.edicion);
      this.init();
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      sets: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      diet: ['', Validators.required],
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

      this.exercise.nameExercise = this.form.value.name;
      this.exercise.setsExercise = this.form.value.sets;
      this.exercise.diet = new Diet();
      this.exercise.diet.idDiet = this.form.value.diet;

      console.log('Objeto Exercise preparado para insertar/actualizar:', this.exercise);

      if (this.edicion) {
        console.log('Modo edición, llamando a ExerciseService.update()');
        this.exerciseService.update(this.exercise).subscribe((data) => {
          console.log('Respuesta de update:', data);
          this.exerciseService.list().subscribe((data) => {
            this.exerciseService.setList(data);
          });
        });
      } else {

        console.log('Modo creación, llamando a ExerciseService.insert()');

        console.log(this.exercise);

        this.exerciseService.insert(this.exercise).subscribe((data) => {
          console.log('Respuesta de insert:', data);
          this.exerciseService.list().subscribe((data) => {
            this.exerciseService.setList(data);
          });
        });
      }
    } else {
      console.warn('Formulario no válido, verifique los errores.');
    }

    this.router.navigate(['Ejercicios']);
  }

  init() {
    if (this.edicion) {
      console.log('Inicializando el formulario en modo edición para ID:', this.id);
      this.exerciseService.listId(this.id).subscribe((data) => {
        console.log('Datos recibidos para edición:', data);
        this.form = new FormGroup({
          name: new FormControl(data.nameExercise, Validators.required),
          sets: new FormControl(data.setsExercise, [Validators.required, Validators.pattern('^[0-9]+$')]),
          diet: new FormControl(data.diet.idDiet, Validators.required),
        });
      });
    }
  }
}
