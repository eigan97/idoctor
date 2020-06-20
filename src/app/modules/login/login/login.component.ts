import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  currentUser: any;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {
    if (localStorage.getItem('currentUser') === 'null' || !localStorage.getItem('currentUser')) {
      console.log('no sesion');
      this.userService.isLogged = false;
    } else {
      this.userService.isLogged = true;
      console.log('si sesion');
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
      console.log(this.currentUser.consulta[0].nombre_rol);
      this.redirectUrlPerfil(this.currentUser.consulta[0].nombre_rol);
    }
   }

  ngOnInit() { }

  logIn() {
    this.loginService.logIn(this.email, this.password).subscribe(response => {
      if ( response.notifications.code === 'CHIDO') {
        this.userService.currentUser = response.data;
        localStorage.setItem('currentUser',  JSON.stringify(response.data));
        this.userService.isLogged = true;
        this.redirectUrlPerfil(response.data.consulta[0].nombre_rol);
      } else {
        alert('Error al ingresar');
      }
    });
  }
  redirectUrlPerfil(perfil: string) {
    switch (perfil) {
      case 'Doctor':
        this.router.navigate(['/pacientes']);
        break;
      case 'Enfermero':
        this.router.navigate(['/pacientes']);
        break;
      case 'Laboratorista':
        this.router.navigate(['./examenes']);
        break;
      case 'Administrador':
        this.router.navigate(['/pacientes']);
        break;
      default:
        this.router.navigate(['/examenes']);
        break;
    }
  }
}
