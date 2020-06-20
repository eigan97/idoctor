import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { variables } from '../../../shared/services/serverenv';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  url: string;
  constructor(private httpClient: HttpClient) { 
    this.url = variables.server;
  }

  // pruebaResponse() {
  //   const url = 'https://mighty-island-73784.herokuapp.com/dogtores/ejemplo?echo=dogtores';
  //   return this.httpClient.get(url, httpOptions)
  //       .pipe(
  //         catchError(this.handleError<any>('Error al consultar Prueba', 'Prueba'))
  //       );
  // }

  logIn(email, password) {
    const userlog = {
      correo: email,
      contrasena: password
    };

    return this.httpClient.post<any>(`${this.url}/personal/login`, userlog, httpOptions)
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
