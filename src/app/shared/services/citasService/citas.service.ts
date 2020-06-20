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
export class CitasService {
  url: string;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {
    this.url = variables.server;
   }

  getCitasPerfil(idPerfil) {
    return this.httpClient.get(`${this.url}/personal/citas/${idPerfil}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  getCitaId(idCita) {
    return this.httpClient.get(`${this.url}/personal/cita/${idCita}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  postCita(idPerfil, idPaciente, fecha) {
    const citaLog = {
      fecha_cita: fecha,
      id_perfil: idPerfil,
      id_paciente: idPaciente
    };
    return this.httpClient.post<any>(`${this.url}/personal/programar_cita`, citaLog, httpOptions)
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
