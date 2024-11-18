import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Diet } from '../models/Diet';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuantityBydietsinicidasydietsfinalizadasbyuser } from '../models/QuantityBydietsinicidasydietsfinalizadasbyuser';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DietService {
  private url = `${base_url}/Dietas`;
  private listaCambio = new Subject<Diet[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Diet[]>(this.url);
  }
  insert(d: Diet) {
    return this.http.post(this.url, d);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Diet[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listTreatmentsByUserId(id:number){
    return this.http.get<Diet[]>(`${this.url}/listarporusuaario/${id}`)
  }

  listId(id: number) {
    return this.http.get<Diet>(`${this.url}/${id}`);
  }

  update(di:Diet){
    return this.http.put(this.url,di);
  }

  getQuantityBydietsinicidasydietsfinalizadasbyuser():Observable<QuantityBydietsinicidasydietsfinalizadasbyuser[]>{
    return this.http.get<QuantityBydietsinicidasydietsfinalizadasbyuser[]>(`${this.url}/cantidaddedietasiniciadasandfinalizadasporusuario`);
  }

}
