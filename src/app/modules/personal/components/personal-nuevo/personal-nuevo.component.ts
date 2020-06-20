import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/rolesService/roles.service';
import { PersonalService } from 'src/app/shared/services/personalService/personal.service';
import { Router } from '@angular/router';
import { ConsultoriosService } from 'src/app/shared/services/consultoriosService/consultorios.service';

@Component({
  selector: 'app-personal-nuevo',
  templateUrl: './personal-nuevo.component.html',
  styleUrls: ['./personal-nuevo.component.css']
})
export class PersonalNuevoComponent implements OnInit {
  imageProfile: any;
  textInputFile = 'Subir foto del usuario';
  roles: any;
  nombreP: any;
  apellidosP: any;
  fechaNacimientoU: any;
  telefono: any;
  email: any;
  password: any;
  idRol = 'Asignar Rol';
  consultorios: any;
  consultorio = 'Asignar Consultorio';

  constructor(private pers: PersonalService, private rs: RolesService, private router: Router,
              private cons: ConsultoriosService) {
    this.rs.getRoles().subscribe(response => {
      this.roles = response.data.consulta;
    });
    this.cons.getConsultorios().subscribe(response => {
      this.consultorios = response.data.consulta;
    });
   }

  ngOnInit() {
  }

  pacienteImage(inputValue: any): void {
    const file = inputValue.target.files[0];
    const myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imageProfile = myReader.result;
      this.textInputFile = 'Cambiar foto del usuario';
    };
    myReader.readAsDataURL(file);
  }

  addUsuario() {
    const usuarioObj = {
      nombre: this.nombreP,
      apellidos: this.apellidosP,
      fecha_nacimiento_u: this.fechaNacimientoU,
      telefono: this.telefono,
      correo: this.email,
      contrasena: this.password,
      foto_usuario: this.imageProfile.split(',')[1],
      id_consultorio: this.consultorio
    };
    this.pers.postUsuario(usuarioObj).subscribe(response => {
      this.pers.postPerfil(response.data.id, this.idRol).subscribe(responsePerfil => {
        if (responsePerfil.notifications.message === 'CONSULTA EXITOSA') {
          this.router.navigate(['/personal']);
        } else {
          alert('No se ha podido crear el personal');
        }
      });
    });
  }
}
