import {Illness} from './Illness';
import {Users} from './Users';

export class Treatments{
  idTreatments: number=0
  descriptionTreatment: string=""
  durationTreatment: number=0
  startDayTreatment:Date = new Date(Date.now())
  finishDayTreatment:Date = new Date(Date.now())
  user:Users=new Users()
  illness:Illness=new Illness()
}
