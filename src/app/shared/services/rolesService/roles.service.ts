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

export class RolesService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = variables.server;
  }

  getRoles() {
    return this.httpClient.get(`${this.url}/personal/roles`, httpOptions)
        .pipe(
          catchError(this.handleError<any>('Error al consultar Roles', 'Pacientes'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}