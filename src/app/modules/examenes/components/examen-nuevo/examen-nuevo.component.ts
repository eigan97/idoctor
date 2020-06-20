import { Component, OnInit } from '@angular/core';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-examen-nuevo',
  templateUrl: './examen-nuevo.component.html',
  styleUrls: ['./examen-nuevo.component.css']
})
export class ExamenNuevoComponent implements OnInit {
  idPaciente: string;
  idPacienteByName: any;
  idExamen: number;
  tipoExamenes: any[];
  pacientes: any[];
  constructor(private examenes: ExamenesService, private pacientesService: PacientesService,
              private us: UserService, private router: Router) { }

  ngOnInit() {
    this.examenes.getTipoExamen().subscribe(response => {
      this.tipoExamenes = response.data.consulta;
    });
    this.pacientesService.getPacientes().subscribe(response => {
      this.pacientes = response.data.consulta;
    });
  }
  newExamen() {
    this.findPacientebyName();
    console.log(this.idPacienteByName);
    this.examenes.postExamen(this.idPacienteByName.id_paciente, this.idExamen).subscribe(response => {
      if (response.notifications.message === 'CONSULTA EXITOSA') {
        this.examenes.postExamenPerfil(this.us.currentUser.consulta[0].id_perfil, response.data.id).subscribe(responsEp => {
        });
        this.router.navigate(['/examenes']);
      } else {
        alert('No se ha creado el examen');
      }
    });
  }
  toNumber() {
    this.idExamen = +this.idExamen;
  }

  findPacientebyName() {
    this.idPacienteByName = this.pacientes.find(element => {
      return `${element.nombre_p} ${element.apellidos_p}` === this.idPaciente;
    });
  }

}
