import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { HttpClient } from '@angular/common/http';
import { TotaldeexercisesbyDietas } from '../models/TotaldeexercisesbyDietas';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private url = `${base_url}/Ejercicios`;
  private listaCambio = new Subject<Exercise[]>();

  constructor(private http: HttpClient) {}

  // Método para listar todos los ejercicios
  list(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.url);
  }

  // Método para insertar un nuevo ejercicio
  insert(exercise: Exercise): Observable<any> {
    return this.http.post(this.url, exercise);
  }

  // Obtener cambios en la lista (para componentes reactivos)
  getList(): Observable<Exercise[]> {
    return this.listaCambio.asObservable();
  }

  // Actualizar la lista de ejercicios
  setList(listaNueva: Exercise[]): void {
    this.listaCambio.next(listaNueva);
  }

  // Método para eliminar un ejercicio por ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Método para obtener un ejercicio por su ID
  listId(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.url}/${id}`);
  }

  // Método para actualizar un ejercicio existente
  update(exercise: Exercise): Observable<any> {
    return this.http.put(this.url, exercise);
  }

  // Método para buscar ejercicios por nombre
  //searchByName(name: string): Observable<Exercise[]> {
  //  return this.http.get<Exercise[]>(`${this.url}/busquedas?nombre=${name}`);
 // }
 //getTotalExercisesByDiet(): Observable<TotaldeexercisesbyDietas[]> {
 // return this.http.get<TotaldeexercisesbyDietas[]>(`${this.url}/totaldecolesterolpordieta`);
//}
 getTotalExercisesByDiet(): Observable<TotaldeexercisesbyDietas[]> {
  return this.http.get<TotaldeexercisesbyDietas[]>(`${this.url}/totalejerciciospordieta`);
}

}
