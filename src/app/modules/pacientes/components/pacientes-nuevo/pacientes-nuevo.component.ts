import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/shared/services/personalService/personal.service';
import { HabitacionesService } from 'src/app/shared/services/habitacionesService/habitaciones.service';
import { AlergiasService } from 'src/app/shared/services/alergiasService/alergias.service';

@Component({
  selector: 'app-pacientes-nuevo',
  templateUrl: './pacientes-nuevo.component.html',
  styleUrls: ['./pacientes-nuevo.component.css']
})
export class PacientesNuevoComponent implements OnInit {
  pacientes: any[];
  personalesMedico: any[];
  personalesEnfermero: any[];
  idPacienteByName: any;
  idPaciente: string;
  imageProfile: any;
  textInputFile = 'Subir foto del paciente';
  nombreP: any; apellidosP: any; sexo = 'Selecciona el sexo' ; fechaNacimientoP: any; lugarNacimiento = 'Seleccionar lugar de nacimiento';
  curp: any; grupoSanguineo = 'Selecciona el grupo sanguineo'; direccion: any; telefono: any; telefonoReferencia: any;
  idTipo = 'Selecciona tipo de paciente';
  idPerfilMedico = 'Asignar perfil';
  idPerfilEnfermero = 'Asignar perfil';
  idHabitacion: any;
  isHabitacion = false;
  habitaciones: any;
  alergias: any;
  idAlergia: any;
  constructor(private ps: PacientesService, private router: Router, private pers: PersonalService,
              private habs: HabitacionesService, private as: AlergiasService) {
    this.ps.getPacientes().subscribe(response => {
      this.pacientes = response.data.consulta;
    });
    this.pers.getPersonal().subscribe(response => {
      this.personalesMedico = response.data.consulta.filter(element => {
          return element.nombre_rol === 'Doctor';
      });
    });
    this.pers.getPersonal().subscribe(response => {
      this.personalesEnfermero = response.data.consulta.filter(element => {
          return  element.nombre_rol === 'Enfermero';
      });
    });
    this.habs.getHabitaciones().subscribe(response => {
      this.habitaciones = response.data.consulta;
    });
    this.as.getAlergias().subscribe(response => {
      this.alergias = response.data.consulta;
    });
  }

  ngOnInit() {

  }

  findPacientebyName() {
    this.idPacienteByName = this.pacientes.find(element => {
      return element.nombre === this.pacientes;
    });
  }
  pacienteImage(inputValue: any): void {
    const file = inputValue.target.files[0];
    const myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imageProfile = myReader.result;
      this.textInputFile = 'Cambiar foto del paciente';
    };
    myReader.readAsDataURL(file);
  }

  addPaciente() {
    const pacienteObj = {
      nombre_p: this.nombreP,
      apellidos_p: this.apellidosP,
      sexo: this.sexo,
      fecha_nacimiento_p: this.fechaNacimientoP,
      lugar_nacimiento: this.lugarNacimiento,
      curp: this.curp,
      grupo_sanguineo: this.grupoSanguineo,
      direccion: this.direccion,
      telefono: this.telefono,
      telefono_referencia: this.telefonoReferencia,
      id_tipo: this.idTipo,
      foto_paciente: this.imageProfile.split(',')[1]
    };
    this.ps.postPaciente(pacienteObj).subscribe(response => {
      if (response.notifications.message === 'CONSULTA EXITOSA') {
        this.idPaciente = response.data.id;
        console.log(this.idPerfilMedico, response.data.id);
        this.pers.postPerfilPaciente(this.idPerfilMedico, response.data.id).subscribe(responsePaciente => {
          if (responsePaciente.notifications.message === 'CONSULTA EXITOSA') {
            console.log(this.idPerfilEnfermero, response.data.id);
            this.pers.postPerfilPaciente(this.idPerfilEnfermero, response.data.id).subscribe(responsePacienteEnfermero => {
              if (responsePacienteEnfermero.notifications.message === 'CONSULTA EXITOSA') {
                const asignacionHabitacionMedico = {
                  id_perfil: this.idPerfilMedico,
                  id_paciente: this.idPaciente,
                  idHabitacion: this.idHabitacion
                };

                const asignacionHabitacionEnfermero = {
                    id_perfil: this.idPerfilEnfermero,
                    id_paciente: this.idPaciente,
                };
                console.log(this.idAlergia, this.idPaciente);
                this.habs.postHabitaciones(asignacionHabitacionMedico).subscribe(responseMedico => {
                    this.habs.postHabitaciones(asignacionHabitacionEnfermero).subscribe(responseEnfermero => {
                      this.as.postAlergia(this.idAlergia, this.idPaciente).subscribe(responseAlergia => {
                        if (responseAlergia.notifications.message === 'CONSULTA EXITOSA') {
                          this.router.navigate(['/pacientes']);
                        }
                      });
                    });
                });
              } else {
                alert('No se ha creado el paciente');
              }
            });
          }
        });
      }
    });
  }

  tipoPacientes(value) {
    if (value === '2') {
      this.isHabitacion = true;
    } else {
      this.isHabitacion = false;
    }
  }
}
