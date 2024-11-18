import { Injectable } from '@angular/core';
import { Quantity } from '../models/Quantity';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  private url = `${base_url}/Cantidades`;
  private listaCambio = new Subject<Quantity[]>();
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Quantity[]>(this.url);
  }

  insert(quan: Quantity){
    return this.http.post(this.url, quan);
  }

  setList(listaNueva: Quantity[]){
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Quantity>(`${this.url}/${id}`);
  }

  update(quan: Quantity) {
    return this.http.put(`${this.url}/${quan.idQuantity}`, quan);
  }



}
