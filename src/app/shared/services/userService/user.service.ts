import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  isLogged: boolean;
  constructor() {
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
    }
   }
}
