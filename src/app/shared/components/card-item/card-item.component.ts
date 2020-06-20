import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '../../services/pacientesService/pacientes.service';
import { DiagnosticosService } from '../../services/diagnosticosService/diagnosticos.service';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() paciente: any;
  @Input() cita: any;
  @Input() personal: any;
  imgUrl: string;
  urlState: string;
  constructor(private router: Router, private ps: PacientesService, private ds: DiagnosticosService,
              private us: UserService) {
    this.urlState = this.router.url.split('/')[1];
  }

  ngOnInit() {
    if (this.urlState === 'consultas') {
      this.imgUrl = 'data:image/png;base64,' + this.cita.foto_paciente;
      this.cita.fecha_cita = this.cita.fecha_cita.split(' ')[0];
      this.cita.consultorio = this.us.currentUser.consulta[0].id_consultorio;
    } else if (this.urlState === 'pacientes') {
      console.log(this.paciente);
      this.imgUrl = 'data:image/png;base64,' + this.paciente.foto_paciente;
      this.ps.getHabitacionPaciente(this.paciente.id_paciente).subscribe(response => {
        if (response.data === null) {
          this.paciente.habitacion = {
            id_habitacion: 'S/N'
          };
        } else {
          this.paciente.habitacion = response.data.consulta[0];
        }
      });
      this.ds.getPacienteUltimoDiagnostico(this.paciente.id_paciente).subscribe(response => {
        if (response.data === null) {
          this.paciente.diagnostico = 'Sin diagnostico';
        } else {
          this.paciente.diagnostico = response.data.descipcion_diagnostico;
        }
      });
    } else if (this.urlState === 'personal') {
      console.log(this.urlState);
      console.log(this.personal);
      this.imgUrl = 'data:image/png;base64,' + this.personal.foto_usuario;
    }
  }

}
