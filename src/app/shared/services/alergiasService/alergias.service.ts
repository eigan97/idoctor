import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { variables } from '../serverenv';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {
  url: string;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {
    this.url = variables.server;
   }

  getAlergias() {
    return this.httpClient.get(`${this.url}/personal/alergias`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  getAlergiasPaciente(idPaciente) {
    return this.httpClient.get(`${this.url}/pacientes/alergias/${idPaciente}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  postAlergia(idAlergia, idPaciente) {
    const alergiaLog = {
      id_alergia: idAlergia,
      id_paciente: idPaciente
    };
    return this.httpClient.post<any>(`${this.url}/personal/alergias/paciente`, alergiaLog, httpOptions)
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
