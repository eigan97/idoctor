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
export class DiagnosticosService {
  url: string;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {
    this.url = variables.server;
   }

  getDiagPacientes(idPaciente) {
    return this.httpClient.get(`${this.url}/personal/diagnosticos/paciente/${idPaciente}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  postDiag(textDiag: string, idPaciente: number) {
    const date = new Date();
    const latestDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    const diagLog = {
      descripcion_diagnostico: textDiag,
      fecha_diagnostico: latestDate,
      id_paciente: idPaciente
    };

    return this.httpClient.post<any>(`${this.url}/personal/diagnostico`, diagLog, httpOptions)
      .pipe(
        tap((solicitud) => solicitud),
        catchError(this.handleError<any>('Send Log data'))
      );
  }

  getPacienteUltimoDiagnostico(idPaciente) {
    return this.httpClient.get(`${this.url}/pacientes/last_diagnostic/${idPaciente}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
