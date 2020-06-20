import { Injectable } from '@angular/core';
import { variables } from '../../../shared/services/serverenv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})

export class HabitacionesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = variables.server;
  }

  getHabitaciones() {
    return this.httpClient.get(`${this.url}/personal/habitaciones`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }
  postHabitaciones(perfilPacienteHabitacion) {
      return this.httpClient.post<any>(`${this.url}/personal/perfil/paciente`, perfilPacienteHabitacion, httpOptions)
      .pipe(
        tap((solicitud) => solicitud),
        catchError(this.handleError<any>('Send Log data'))
      );
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
