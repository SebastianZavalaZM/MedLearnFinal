import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Diet } from '../../../models/Diet';
import { DietService } from '../../../services/diet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrearhpComponent } from "../../hospital/crearhp/crearhp.component";
import { Illness } from '../../../models/Illness';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { IllnessService } from '../../../services/illness.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertardt',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    CrearhpComponent
  ],
  templateUrl: './insertardt.component.html',
  styleUrl: './insertardt.component.css'
})
export class InsertardtComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  diet: Diet = new Diet();
  id: number = 0;
  edicion: boolean = false;
  listaEnfermedades: Illness[] = [];
  listarNombres: Users[] = [];
  iduser: number = 0;

  constructor(
    private deS: DietService,
    private uS: UsersService,
    private iS: IllnessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
  }

  verificar() {
    this.iduser = this.loginService.showIdUser();
    return this.loginService.verificar();
  }

  ngOnInit(): void {
    console.log('Componente InsertardtComponent inicializado');
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log('Modo edición:', this.edicion);
      this.init();
    });

    this.form = this.formBuilder.group({
      codigod: [''],
      descriptiond: ['', Validators.required],
      durationd: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startd: [''],
      finalizard: [''],
      illnessd: ['', Validators.required],
      userd: [''],
    });

    this.iS.list().subscribe((data) => {
      this.listaEnfermedades = data;
      console.log('Lista de Enfermedades cargada:', this.listaEnfermedades);
    });

    this.uS.list().subscribe((data) => {
      this.listarNombres = data;
      console.log('Lista de Usuarios cargada:', this.listarNombres);
    });
  }

  insertar(): void {
    console.log('Formulario válido:', this.form.valid);
    if (this.form.valid) {
      console.log('Valores del formulario:', this.form.value);
      this.form.patchValue({
        startd: '2024-11-15',
        finalizard: '2024-11-15'
      });
      this.diet.idDiet = this.form.value.codigod;
      this.diet.descriptionDiet = this.form.value.descriptiond;
      this.diet.durationDiet = this.form.value.durationd;
      this.diet.startDayDiet = this.form.value.startd;
      this.diet.finishDayDiet = this.form.value.finalizard;
      this.diet.illness.idIllness = this.form.value.illnessd // Crea un objeto Illness para asignar el ID
      this.diet.user.idUser = this.form.value.userd; // Crea un objeto Users para asignar el ID

      console.log('Objeto Diet preparado para insertar/actualizar:', this.diet);

      if (this.edicion) {
        console.log('Modo edición, llamando a DietService.update()');
        this.deS.update(this.diet).subscribe((data) => {
          console.log('Respuesta de update:', data);
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      } else {
        console.log('Modo creación, llamando a DietService.insert()');
        this.deS.insert(this.diet).subscribe((data) => {
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      }
    } else {
      console.warn('Formulario no válido, verifique los errores.');
    }

    this.router.navigate(['Dietas']);
  }

  init() {
    if (this.edicion) {
      console.log('Inicializando el formulario en modo edición para ID:', this.id);
      this.deS.listId(this.id).subscribe((data) => {
        console.log('Datos recibidos para edición:', data);
        this.form = new FormGroup({
          codigod: new FormControl(data.idDiet),
          descriptiond: new FormControl(data.descriptionDiet),
          durationd: new FormControl(data.durationDiet),
          startd: new FormControl(data.startDayDiet),
          finalizard: new FormControl(data.finishDayDiet),
          illnessd: new FormControl(data.illness.idIllness),
          userd: new FormControl(data.user.idUser),
        });
      });
    }
  }
}
