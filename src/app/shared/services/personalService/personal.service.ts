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

export class PersonalService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = variables.server;
  }

  getPersonal() {
    return this.httpClient.get(`${this.url}/personal/perfiles`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }
  getPersonalId(idPerfil) {
    return this.httpClient.get(`${this.url}/personal/perfiles/${idPerfil}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }
  postUsuario(usuarioObj) {
    return this.httpClient.post<any>(`${this.url}/personal/usuario`, usuarioObj, httpOptions)
    .pipe(
      tap((solicitud) => solicitud),
      catchError(this.handleError<any>('Send Log data'))
    );
  }

  postPerfil(idUsuario, idRol) {
    const perfil = {
      id_usuario  : idUsuario,
      id_rol: idRol
    };
    return this.httpClient.post<any>(`${this.url}/personal/perfil/`, perfil, httpOptions)
    .pipe(
      tap((solicitud) => solicitud),
      catchError(this.handleError<any>('Send Log data'))
    );
  }
  postPerfilPaciente(idPerfil, idPaciente) {
    const perfilPaciente = {
      id_perfil: idPerfil,
      id_paciente: idPaciente
    };
    return this.httpClient.post<any>(`${this.url}/personal/perfil/paciente`, perfilPaciente, httpOptions)
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
