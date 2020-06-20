import { Injectable } from '@angular/core';
import { variables } from '../../../shared/services/serverenv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})

export class ConsultoriosService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = variables.server;
  }

  getConsultorios() {
    return this.httpClient.get(`${this.url}/personal/consultorios`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }

  putConsultorio(idPerfil, idConsultorio ) {
    const consultorioLog = {
      id_perfil: idPerfil,
      id_consultorio: idConsultorio
    };
    console.log(consultorioLog);
    return this.httpClient.put<any>(`${this.url}/personal/consultorio/asignar`, consultorioLog, httpOptions)
      .pipe(
        tap((solicitud) => solicitud),
        catchError(this.handleError<any>('Send Log data'))
      );
  }

  putConsultorioRemove(idPerfil, idConsultorio) {
    const consultorioLog = {
      id_perfil: idPerfil,
      id_consultorio: idConsultorio
    };
    console.log(consultorioLog);
    return this.httpClient.put<any>(`${this.url}/personal/consultorio/quitar`, consultorioLog, httpOptions)
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
