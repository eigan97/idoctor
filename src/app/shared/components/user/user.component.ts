import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  mainTitle: string;
  currentUser: any;
  constructor(private router: Router, private userService: UserService) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
    this.titleInit(this.router.url.split('/'));
  }

  urlInit($event) {
    this.titleInit($event.split('/'));
  }

  titleInit(urlCurrent) {
    const urlArray =  urlCurrent;
    if (urlArray.length <= 2) {
      switch (urlArray[1]) {
        case 'pacientes':
          this.mainTitle = `Mis ${urlArray[1]}`;
          break;
        case 'consultas':
          this.mainTitle = `Mis ${urlArray[1]}`;
          break;
        case 'examenes':
          this.mainTitle = `Mis ${urlArray[1]}`;
          break;
        case 'personal':
          this.mainTitle = `Mi ${urlArray[1]}`;
          break;
      }
    } else {
      switch (urlArray[1]) {
        case 'pacientes':
          this.mainTitle = urlArray[2] === 'new' ? `Mis ${urlArray[1]} / Nuevo paciente` : `Mis ${urlArray[1]} / ${urlArray[2]}`;
          break;
        case 'consultas':
          this.mainTitle = urlArray[2] === 'new' ? `Mis ${urlArray[1]} / Nueva consulta` : `Mis ${urlArray[1]} / ${urlArray[2]}`;
          break;
        case 'examenes':
          this.mainTitle = urlArray[2] === 'new' ? `Mis ${urlArray[1]} / Nuevo examen` : `Mis ${urlArray[1]} / ${urlArray[2]}`;
          break;
        case 'personal':
          this.mainTitle = urlArray[2] === 'new' ? `Mi ${urlArray[1]} / Nuevo personal` : `Mis ${urlArray[1]} / ${urlArray[2]}`;
          break;
      }
    }
  }

}
