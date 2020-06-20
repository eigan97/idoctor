import { Component, OnInit } from '@angular/core';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';

@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.css']
})
export class ListaExamenesComponent implements OnInit {
  examenesPerfil: any;
  currentUser: any;
  constructor(private examenesService: ExamenesService, private us: UserService, private ps: PacientesService) {
    this.currentUser = this.us.currentUser;
    if (this.currentUser.consulta[0].nombre_rol !== 'Enfermero' && this.currentUser.consulta[0].nombre_rol !== 'Laboratorista') {
      this.examenesService.getExamenesPerfil(this.currentUser.consulta[0].id_usuario).subscribe(response => {
        if (response.data !== null) {
          this.examenesPerfil = response.data.consulta;
        } else {
          this.examenesPerfil = [];
        }
      });
    } else if (this.currentUser.consulta[0].nombre_rol === 'Laboratorista') {
      this.examenesService.getExamenes().subscribe(response => {
        this.examenesPerfil = response.data.consulta;
      });
    } else {
      const examenesPacientes = [];
      this.ps.getPacientesPerfil(this.us.currentUser.consulta[0].id_perfil).subscribe(response => {
        if (response.notifications.code === 'CHIDO') {
          response.data.consulta.forEach(element => {
            this.examenesService.getExamenesPacientes(element.id_paciente).subscribe(responseExamen => {
              if (responseExamen.notifications.code === 'CHIDO') {
                responseExamen.data.consulta.forEach(elementExamen => {
                  examenesPacientes.push(elementExamen);
                });
              }
            });
          });
        }
      });
      this.examenesPerfil = examenesPacientes;
    }
  }

  ngOnInit() {

  }

}
