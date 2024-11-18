import { CommonModule } from '@angular/common'; //
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';//
import { MatButtonModule } from '@angular/material/button'; //
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Treatments} from '../../../models/treatments';
import {TreatmentsService} from '../../../services/treatments.service';
import {Illness} from '../../../models/Illness';
import {IllnessService} from '../../../services/illness.service';

@Component({
  selector: 'app-insertartr',
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
  templateUrl: './insertartr.component.html',
  styleUrl: './insertartr.component.css'
})
export class InsertartrComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  treatment:Treatments  = new Treatments();
  listaIllness: Illness[] = [];
  id: number = 0;
  edicion: boolean=false;

  constructor(
    private tS: TreatmentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private iS: IllnessService
  ) {}

  ngOnInit(): void {
    console.log('Componente InsertardtComponent inicializado');             //editaar
    this.route.params.subscribe((data: Params) =>{
      this.id=data['id'];
      this.edicion=data['id'] > 0;    //!=null;
      this.init()

    });
    this.form = this.formBuilder.group({
      codigot:[''],
      descriptiont: ['',Validators.required],
      durationt: ['',Validators.required],
      startt: ['',Validators.required],
      finalizart: ['',Validators.required],
      illnesst:['', Validators.required],
    });

    this.iS.list().subscribe((data) => {
      this.listaIllness = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      console.log('Formulario válido:', this.form.valid);
      //this.treatment.idTreatments=this.form.value.codigot;
      this.treatment.descriptionTreatment = this.form.value.descriptiont;
      this.treatment.durationTreatment = this.form.value.durationt;
      this.treatment.startDayTreatment = this.form.value.startt;
      this.treatment.finishDayTreatment = this.form.value.finalizart;
      this.treatment.illness.idIllness = this.form.value.illnesst;

      console.log('Objeto Diet preparado para insertar/actualizar:', this.treatment);

      if(this.edicion){//edicion
        console.log('Modo edición, llamando a TreatmentsService.update()'); //actualizar
        this.tS.update(this.treatment).subscribe((data) => {
          console.log('Respuesta de update:', data);
          this.tS.list().subscribe((data) => {
            console.log('Lista de Tratamientos actualizada:', data);
            this.tS.setList(data);
            this.router.navigate(['Tratamientoss']);
          });
        });
      }else{
        console.log('Modo creación, llamando a TreatmentsService.insert()');
        this.tS.insert(this.treatment).subscribe((data) => {
          console.log('Respuesta de insert:', data);
          this.tS.list().subscribe((data) => {
            console.log('Lista de medicinas actualizada:', data);
            this.tS.setList(data);
            this.router.navigate(['Tratamientoss']);
          });
        });
      }

    }
    else {
      console.warn('Formulario no válido, verifique los errores.');
    }
    //this.router.navigate(['Tratamientoss']);//////////////

  }
  init(){
    if(this.edicion){//edicion
      console.log('Inicializando el formulario en modo edición para ID:', this.id);
      this.tS.listId(this.id).subscribe(data=>{
        console.log('Datos recibidos para edición:', data);
        this.form=new FormGroup({
          codigot:new FormControl(data.idTreatments),
          descriptiont:new FormControl(data.descriptionTreatment),
          durationt:new FormControl(data.durationTreatment),
          startt: new FormControl(data.startDayTreatment),
          finalizart:new FormControl(data.finishDayTreatment),
          illnesst:new FormControl(data.illness.idIllness),
        })
      })
    }
  }

}
