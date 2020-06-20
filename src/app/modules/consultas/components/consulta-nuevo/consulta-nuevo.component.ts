import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/shared/services/citasService/citas.service';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-nuevo',
  templateUrl: './consulta-nuevo.component.html',
  styleUrls: ['./consulta-nuevo.component.css']
})
export class ConsultaNuevoComponent implements OnInit {
  nombrePaciente: any;
  fechaCita: any;
  estudioCita: any;
  idPacienteByName: any;
  pacientes: any;
  tipoExamenes: any;
  estudio: any;
  constructor(private cs: CitasService, private pacientesService: PacientesService, private us: UserService,
              private examenes: ExamenesService, private router: Router) { }

  ngOnInit() {
    const pacientesArray = [];
    this.pacientesService.getPacientesPerfil(this.us.currentUser.consulta[0].id_perfil).subscribe(response => {
        response.data.consulta.forEach(element => {
          if (element.nombre_tipo === 'Transitorio') {
            pacientesArray.push(element);
          }
        });
    });
    this.pacientes = pacientesArray;
    this.examenes.getTipoExamen().subscribe(response => {
      this.tipoExamenes = response.data.consulta;
    });
  }


  newCita() {
    this.findPacientebyName();
    console.log(this.us.currentUser.consulta[0].id_perfil);
    console.log(this.idPacienteByName);
    this.cs.postCita(this.us.currentUser.consulta[0].id_perfil, this.idPacienteByName.id_paciente, '' + this.fechaCita)
    .subscribe(response => {
        console.log(response);
    });
    if (this.estudio !== 0) {
      this.examenes.postExamen(this.idPacienteByName.id_paciente, this.estudio).subscribe(response => {
        if (response.notifications.message === 'CONSULTA EXITOSA') {
          this.examenes.postExamenPerfil(this.us.currentUser.consulta[0].id_perfil, response.data.id).subscribe(responsEp => {
          });
        } else {
          alert('No se ha creado el examen');
        }
      });
    }
    this.router.navigate(['/consultas']);
  }
  findPacientebyName() {
    this.idPacienteByName = this.pacientes.find(element => {
      console.log(`${element.nombre_p} ${element.apellidos_p}`);
      console.log(element);
      return `${element.nombre_p} ${element.apellidos_p}` === this.nombrePaciente && element.nombre_tipo === 'Transitorio';
    });
  }

}
