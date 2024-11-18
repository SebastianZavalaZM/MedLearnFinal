import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Food } from '../models/Food';
import { HttpClient } from '@angular/common/http';
import { Totaldecaloriesbydiet } from '../models/TotaldecaloriesbydietDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private url = `${base_url}/Alimentos`;
  private listaCambio = new Subject<Food[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Food[]> {
    return this.http.get<Food[]>(this.url);
  }

  insert(food: Food): Observable<any> {
    return this.http.post(this.url, food);
  }

  getList(): Observable<Food[]> {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Food[]): void {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.url}/${id}`);
  }

  update(food: Food): Observable<any> {
    return this.http.put(this.url, food);
  }

  getTotalCaloriesByDiet(): Observable<Totaldecaloriesbydiet[]> {
    return this.http.get<Totaldecaloriesbydiet[]>(`${this.url}/totaldecolesterolpordieta`);
  }


}
