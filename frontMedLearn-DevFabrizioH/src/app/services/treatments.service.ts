import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Treatments} from '../models/treatments';
import {TreatmentDTO} from '../models/TreatmentDTO';
import {AverageDurationByTreatmentTypeDTO} from '../models/AverageDurationByTreatmentTypeDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService {
  private url = `${base_url}/Tratamientos`;
  private listaCambio = new Subject<Treatments[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Treatments[]>(`${this.url}/listado`);
  }
  insert(t: Treatments) {
    return this.http.post(`${this.url}/registrar`, t);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Treatments[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Treatments>(`${this.url}/${id}`);
  }
  update(tl:Treatments){
    return this.http.put(`${this.url}/actualizar`, tl);
  }

  getCantidad(): Observable<TreatmentDTO[]> {
    return this.http.get<TreatmentDTO[]>(`${this.url}/cantidades`);
  }

  getAverage(): Observable<AverageDurationByTreatmentTypeDTO[]> {
    return this.http.get<AverageDurationByTreatmentTypeDTO[]>(`${this.url}/promedioDuracion`);
  }


}
