import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';
import { DiagnosticosService } from 'src/app/shared/services/diagnosticosService/diagnosticos.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { AlergiasService } from 'src/app/shared/services/alergiasService/alergias.service';

@Component({
  selector: 'app-paciente-nombre',
  templateUrl: './paciente-nombre.component.html',
  styleUrls: ['./paciente-nombre.component.css']
})
export class PacienteNombreComponent implements OnInit {
  currentPaciente: any;
  currentUser: any;
  examenesPaciente: any;
  diagPacientes: any;
  aniosPaciente: number;
  idPaciente: number;
  diagnostico: string;
  alergiasPaciente: any;
  constructor(private router: Router, private ps: PacientesService, private es: ExamenesService,
              private ds: DiagnosticosService, private us: UserService, private as: AlergiasService) {
    this.currentUser = this.us.currentUser;
    this.idPaciente = +this.router.url.split('/')[2];
    this.ps.getPacientesId(this.idPaciente).subscribe(response => {
      const años = new Date().getFullYear() - new Date(response.data.fecha_nacimiento_p).getFullYear();
      this.aniosPaciente = años;
      this.currentPaciente = response.data;
      this.currentPaciente.foto_paciente = 'data:image/png;base64,' + this.currentPaciente.foto_paciente;
      this.es.getExamenesPacientes(this.currentPaciente.id_paciente).subscribe(responseExamen => {
        this.examenesPaciente = responseExamen.data.consulta;
      });
      this.ds.getDiagPacientes(this.currentPaciente.id_paciente).subscribe(responseDiag => {
        this.diagPacientes = responseDiag.data.consulta;
      });
      this.as.getAlergiasPaciente(this.currentPaciente.id_paciente).subscribe(responseAlergia => {
        console.log(responseAlergia);
        if (responseAlergia.data === null) {
          console.log(responseAlergia);
          this.alergiasPaciente = 'Sin Alergia';
        } else {
          this.alergiasPaciente = responseAlergia.data.consulta[0].nombre_alergia;
        }
      });
    });
  }

  ngOnInit() {
  }

  crearDiagnostico() {
    this.ds.postDiag(this.diagnostico, this.currentPaciente.id_paciente).subscribe(response => {
      if (response.notifications.message === 'CONSULTA EXITOSA') {
        const inputElement: HTMLInputElement = document.getElementById('diagTextarea') as HTMLInputElement;
        inputElement.value = '';
        this.ds.getDiagPacientes(this.currentPaciente.id_paciente).subscribe(responseDiag => {
          this.diagPacientes = responseDiag.data.consulta;
        });
      } else {
        alert('No se creo el diagnostico');
      }
    });
  }

  transferirPaciente() {
    this.ps.putTransferirPaciente(this.idPaciente).subscribe(response => {
      if (response.notifications.code === 'CHIDO') {
        this.router.navigate(['/pacientes']);
      }
    });
  }

  internarPaciente(paciente) {
    let idTipo;
    if (paciente.nombre_tipo === 'Transitorio') {
      idTipo = 2;
    } else {
      idTipo = 1;
    }
    this.ps.putTipoPaciente(this.idPaciente, idTipo).subscribe(response => {
      if (response.notifications.code === 'CHIDO') {
        this.router.navigate(['/pacientes']);
      }
    });
  }
}
