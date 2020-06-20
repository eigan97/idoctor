import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/shared/services/citasService/citas.service';
import { DiagnosticosService } from 'src/app/shared/services/diagnosticosService/diagnosticos.service';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';

@Component({
  selector: 'app-consulta-nombre',
  templateUrl: './consulta-nombre.component.html',
  styleUrls: ['./consulta-nombre.component.css']
})
export class ConsultaNombreComponent implements OnInit {
  idCita: number;
  citas: any;
  diagPacientes: any;
  diagnostico: string;
  examenesPaciente: any;
  constructor(private router: Router, private cs: CitasService, private ds: DiagnosticosService, private es: ExamenesService) {
    this.idCita = +this.router.url.split('/')[2];
    this.cs.getCitaId(this.idCita).subscribe(response => {
      this.citas = response.data;
      this.citas.fecha_nacimiento_p = new Date().getFullYear() - new Date(response.data.fecha_nacimiento_p).getFullYear();
      this.citas.foto_paciente = 'data:image/png;base64,' + this.citas.foto_paciente;
      this.ds.getDiagPacientes(this.citas.id_paciente).subscribe(responseDiag => {
        this.diagPacientes = responseDiag.data.consulta;
      });
      this.es.getExamenesPacientes(this.citas.id_paciente).subscribe(responseExamen => {
        this.examenesPaciente = responseExamen.data.consulta;
      });
    });
  }

  ngOnInit() {
  }

  crearDiagnostico() {
    this.ds.postDiag(this.diagnostico, this.citas.id_paciente).subscribe(response => {
      if (response.notifications.message === 'CONSULTA EXITOSA') {
        const inputElement: HTMLInputElement = document.getElementById('diagTextarea') as HTMLInputElement;
        inputElement.value = '';
        this.ds.getDiagPacientes(this.citas.id_paciente).subscribe(responseDiag => {
          this.diagPacientes = responseDiag.data.consulta;
        });
      } else {
        alert('No se creo el diagnostico');
      }
    });
  }
}
