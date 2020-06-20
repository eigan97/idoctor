import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() currentUser: any;
  showOptions = false;
  imgUrl: string;
  constructor(private router: Router, private us: UserService) {
   }

  ngOnInit() {
    this.imgUrl = 'data:image/png;base64,' + this.currentUser.consulta[0].foto_usuario;
  }

  toggleOptions(e) {
    this.showOptions = !this.showOptions;
    const target = e.target || e.srcElement || e.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    if (this.showOptions) {
      document.getElementById(value).style.transform = 'rotate(180deg)';
    } else {
      document.getElementById(value).style.transform = 'rotate(360deg)';
    }
  }
  logOut() {
    this.us.isLogged = false;
    localStorage.setItem('currentUser', null);
    this.router.navigate(['/login']);
  }
}
