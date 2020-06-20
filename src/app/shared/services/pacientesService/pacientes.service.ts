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

export class PacientesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = variables.server;
  }

  getPacientes() {
    return this.httpClient.get(`${this.url}/pacientes`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }

  getPacientesPerfil(idPerfil: number) {
    return this.httpClient.get(`${this.url}/personal/perfil/pacientes/${idPerfil}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }

  getPacientesId(idPaciente: number) {
    return this.httpClient.get(`${this.url}/pacientes/${idPaciente}`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
        );
  }

  getHabitacionPaciente(idPaciente) {
    return this.httpClient.get(`${this.url}/pacientes/paciente/habitacion/${idPaciente}`, httpOptions)
    .pipe(
      catchError(this.handleError<any>('Error al consultar Pacientes', 'Pacientes'))
    );
  }

  postPaciente({nombre_p, apellidos_p, sexo, fecha_nacimiento_p, lugar_nacimiento, curp,
                grupo_sanguineo, direccion, telefono, telefono_referencia, id_tipo, foto_paciente})  {
    const pacienteLog = {
      nombre_p,
      apellidos_p,
      sexo,
      fecha_nacimiento_p,
      lugar_nacimiento,
      curp,
      grupo_sanguineo,
      direccion,
      telefono,
      telefono_referencia,
      id_tipo,
      foto_paciente
    };

    return this.httpClient.post<any>(`${this.url}/personal/paciente`, pacienteLog, httpOptions)
    .pipe(
      tap((solicitud) => solicitud),
      catchError(this.handleError<any>('Send Log data'))
    );
  }

  putTransferirPaciente(idPaciente) {
    return this.httpClient.put<any>(`${this.url}/personal/pacientes/transferir/${idPaciente}`, httpOptions)
    .pipe(
      tap((solicitud) => solicitud),
      catchError(this.handleError<any>('Send Log data'))
    );
  }

  putTipoPaciente(idPaciente, idTipo) {
    const tipoPaciente = {
      id_paciente: idPaciente,
      id_tipo: idTipo
    };
    return this.httpClient.put<any>(`${this.url}/personal/paciente/tipo`, tipoPaciente, httpOptions)
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
