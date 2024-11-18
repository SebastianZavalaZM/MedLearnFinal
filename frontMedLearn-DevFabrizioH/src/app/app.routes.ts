import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { InsertarmedComponent } from './components/medicine/insertarmed/insertarmed.component';
import { UsersComponent } from './components/users/users.component';
import { InsertarusComponent } from './components/users/insertarus/insertarus.component';
import { InsertarquanComponent } from './components/quantity/insertarquan/insertarquan.component';
import { ListarquanComponent } from './components/quantity/listarquan/listarquan.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import {TreatmentsComponent} from './components/treatments/treatments.component';
import {InsertartrComponent} from './components/treatments/insertartr/insertartr.component';

import { HospitalComponent } from './components/hospital/hospital.component';
import { CrearhpComponent } from './components/hospital/crearhp/crearhp.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NumberdietinityfinComponent } from './components/reportes/numberdietinityfin/numberdietinityfin.component';
import { ProporcionUsersComponent } from './components/reportes/proporcion-users/proporcion-users.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from '../guard/seguridad.guard';
import { HistorialComponent } from './components/historial/historial.component';
import { HistorialdietasComponent } from './components/historial/historialdietas/historialdietas.component';
import { ListardtComponent } from './components/diet/listardt/listardt.component';
import { InsertarfdComponent } from './components/food/insertarfd/insertarfd.component';
import { FoodComponent } from './components/food/food.component';
import { InsertarexComponent } from './components/exercises/insertarex/insertarex.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TotalcaloriaspordietaComponent } from './components/reportes/totalcaloriaspordieta/totalcaloriaspordieta.component';
import { TotalejerciciospordietaComponent } from './components/reportes/totalejerciciospordieta/totalejerciciospordieta.component';
import { PromedioduraciontratamientoComponent } from './components/reportes/promedioduraciontratamiento/promedioduraciontratamiento.component';

import { ReportetratamientoporenfermedadComponent } from './components/reportes/reportetratamientoporenfermedad/reportetratamientoporenfermedad.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'nuevacuenta', component: InsertarusComponent,
        children:[
          {
              path: 'nuevohp/:id', component: CrearhpComponent,
          },
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'Enfermedades', component: IllnessComponent,
        children:[
            {path: 'nuevoenf', component: InsertarComponent,

            },
            {
                path: 'edicionesenf/:id', component:InsertarComponent,
            },
        ],
        canActivate: [seguridadGuard],
    },

    {
        path: 'reportes', component: ReportesComponent,
        children:[
            {
                path: 'numberdietinityfinal', component: NumberdietinityfinComponent,
            },
            {
                path: 'edicionesrep/:id', component:InsertarComponent,
            },
            {
                path: 'proportionusers', component: ProporcionUsersComponent,
            },
            {
              path: 'totalcaloriaspordieta', component: TotalcaloriaspordietaComponent,
            },
            {
              path: 'totalejerciciospordieta', component: TotalejerciciospordietaComponent,
            },
            {
              path: 'reportetratamientosporenfermedad', component: ReportetratamientoporenfermedadComponent,
            },
            {
              path: 'promedioduraciontratamiento', component: PromedioduraciontratamientoComponent,
            }

        ],
        canActivate: [seguridadGuard],
    },

    {
        path:'Dietas', component:DietComponent,
        children:[
            {
                path: 'nuevodt', component: InsertardtComponent,
            },
            {
                path:'edicionesdt/:id', component:InsertardtComponent,
            },
            {
                path: ':id', component: DietComponent, // Ruta para ver detalles de la dieta de una enfermedad específica
            },
        ],
        canActivate: [seguridadGuard],
    },
    {
      path:'Ejercicios', component:ExercisesComponent,
      children:[
          {
              path: 'nuevoex', component: InsertarexComponent,
          },
          {
            path:'edicionesex/:id', component: InsertarexComponent,
          },
      ],
    },
    {
      path:'Medicinas', component:MedicineComponent,
      children:[
          {
              path: 'nuevomed', component: InsertarmedComponent,
          },
          {
              path:'edicionesmed/:id', component:InsertarmedComponent,
          },
      ],
  },
  {
    path:'Cantidades', component:QuantityComponent,
    children:[
        {
            path: 'nuevoCanti', component: InsertarquanComponent,
        },
        {
          path:'editas/:id', component: InsertarquanComponent,
        },
    ],

  },
    {
      path:'Alimentos', component:FoodComponent,
      children:[
          {
              path: 'nuevofd', component: InsertarfdComponent,
          },
          {
            path:'edicionesfd/:id', component: InsertarfdComponent,
          },
      ],

    },

    {
      path:'Usuarioss', component:UsersComponent,
      children:[
          {
              path: 'nuevous', component: InsertarusComponent,
              children:[
                {
                    path: 'nuevohp/:id', component: CrearhpComponent,
                },
              ],
          },
      ],
    },

    {
      path:'Hospitales', component:HospitalComponent,
      canActivate: [seguridadGuard],
    },

    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [seguridadGuard],
    },

  {
    path:'historial/:id', component:ListardtComponent,
    canActivate: [seguridadGuard],
  },

  {
    path:'Tratamientoss',
    component:TreatmentsComponent,
    children:[
      {path: 'nuevotr', component: InsertartrComponent,},
      {path:'edicionestr/:id', component:InsertartrComponent,}
    ],
  },

];


