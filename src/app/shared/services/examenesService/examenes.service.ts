import { Injectable } from '@angular/core';
import { variables } from '../../../shared/services/serverenv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export class ExamenesService {
  url: string;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {
    this.url = variables.server;
  }

  getExamenes() {
    return this.httpClient.get(`${this.url}/personal/examenes`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }
  getExamenesPerfil(idperfil: string) {
    return this.httpClient.get(`${this.url}/personal/examenes/perfil/${idperfil}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  getExamenesId(idexamen) {
    return this.httpClient.get(`${this.url}/personal/examenes/${idexamen}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }
  getExamenesPacientes(idPaciente) {
    return this.httpClient.get(`${this.url}/pacientes/examenes/${idPaciente}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }
  postExamen(idPaciente: any, idExamen: any) {
    const date = new Date();
    const latestDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    const examenLog = {
      fecha_examen: latestDate,
      id_examen: idExamen,
      id_paciente: idPaciente
    };

    return this.httpClient.post<any>(`${this.url}/personal/examen`, examenLog, httpOptions)
      .pipe(
        tap((solicitud) => solicitud),
        catchError(this.handleError<any>('Send Log data'))
      );
  }
  postExamenPerfil(idPerfil: any, idExamen: any) {
    const examenPerfilLog = {
      id_perfil: idPerfil,
      id_examen: idExamen
    };
    return this.httpClient.post<any>(`${this.url}/personal/perfil/examen`, examenPerfilLog, httpOptions)
      .pipe(
        tap((solicitud) => solicitud),
        catchError(this.handleError<any>('Send Log data'))
      );
  }

  getTipoExamen() {
    return this.httpClient.get(`${this.url}/personal/tipo_examenes`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
        );
  }

  putExamen(descripcion, idExamen) {
    const examenLog = {
      descripcion
    };
    return this.httpClient.put<any>(`${this.url}/personal/examen/${idExamen}`, examenLog, httpOptions)
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
