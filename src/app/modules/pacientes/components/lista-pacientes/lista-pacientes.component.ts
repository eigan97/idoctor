import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
  currentUser: any;
  currentPacientes: any[];
  constructor(private ps: PacientesService, private us: UserService) {
    this.currentUser = this.us.currentUser.consulta[0];
   }

  ngOnInit() {
    this.ps.getPacientesPerfil(this.us.currentUser.consulta[0].id_perfil).subscribe(response => {
      if (response.notifications.code === 'CHIDO') {
        this.currentPacientes = response.data.consulta;
      } else if (this.us.currentUser.consulta[0].nombre_rol === 'Administrador') {
        this.ps.getPacientes().subscribe(responseAll => {
          this.currentPacientes = responseAll.data.consulta;
        });
      } else {
        this.currentPacientes = [];
      }
    });
  }

}
