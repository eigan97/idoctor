import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() currentUser: any;
  @Output() titleOutput: EventEmitter<string>;

  constructor() {
    this.titleOutput = new EventEmitter();
   }

  ngOnInit() {
  }

  menuSelect(url) {
    this.titleOutput.emit(url);
  }
}
