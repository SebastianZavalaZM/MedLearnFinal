import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Hospital } from '../models/Hospital';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private url = `${base_url}/Hospitales`;
  private listaCambio = new Subject<Hospital[]>();

  constructor(private http: HttpClient) { };

  list(){
    return this.http.get<Hospital[]>(`${this.url}/listaordenadaporvistas`);
  }

  insert(u: Hospital){
    return this.http.post(`${this.url}/crear`, u);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Hospital[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Hospital>(`${this.url}/${id}`);
  }

  searchByName(name: String) {
    return this.http.get<Hospital[]>(`${this.url}/busquedas?nombre=${name}`);
  }

}

