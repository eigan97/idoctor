import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { PersonalService } from 'src/app/shared/services/personalService/personal.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {
  currentUser: any;
  currentPersonal: any[];
    constructor(private us: UserService, private pers: PersonalService) {
      this.currentUser = this.us.currentUser.consulta[0];
      this.pers.getPersonal().subscribe(response => {
        this.currentPersonal = response.data.consulta;
      });
   }

  ngOnInit() {
  }

}
