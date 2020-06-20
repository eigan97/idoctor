import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { CitasService } from 'src/app/shared/services/citasService/citas.service';

@Component({
  selector: 'app-lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrls: ['./lista-consultas.component.css']
})
export class ListaConsultasComponent implements OnInit {
  currentCitas: any[];
  constructor(private us: UserService, private cs: CitasService) {
    this.cs.getCitasPerfil(this.us.currentUser.consulta[0].id_perfil).subscribe( response => {
        console.log(response);
        this.currentCitas = response.data.consulta;
      }
    );
  }

  ngOnInit() {
  }

}
