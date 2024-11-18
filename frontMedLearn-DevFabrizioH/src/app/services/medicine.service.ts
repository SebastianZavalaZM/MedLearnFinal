import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Medicine } from '../models/Medicine';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private url = `${base_url}/Medicinas`;
  private listaCambio = new Subject<Medicine[]>();

  constructor(private http: HttpClient) {}
  list(){
    return this.http.get<Medicine[]>(this.url);
  }

  insert(med: Medicine){
    return this.http.post(this.url, med);
  }

  setList(listaNueva: Medicine[]){
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
  listId(id: number) {
    return this.http.get<Medicine>(`${this.url}/${id}`);
  }

  update(med: Medicine) {
    return this.http.put(`${this.url}/actualizar`, med);
  }



}


