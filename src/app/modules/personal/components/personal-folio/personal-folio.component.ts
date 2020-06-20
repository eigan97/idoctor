import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/shared/services/personalService/personal.service';
import { Router } from '@angular/router';
import { ConsultoriosService } from 'src/app/shared/services/consultoriosService/consultorios.service';

@Component({
  selector: 'app-personal-folio',
  templateUrl: './personal-folio.component.html',
  styleUrls: ['./personal-folio.component.css']
})
export class PersonalFolioComponent implements OnInit {
  idPerfil: any;
  currentPerfil: any;
  aniosPerfil: number;
  isConsultorio = false;
  constructor(private pers: PersonalService, private router: Router, private cs: ConsultoriosService) {
    this.idPerfil = +this.router.url.split('/')[2];
    this.pers.getPersonalId(this.idPerfil).subscribe(response => {
      this.currentPerfil = response.data;
      const años = new Date().getFullYear() - new Date(response.data.fecha_nacimiento_u).getFullYear();
      this.aniosPerfil = años;
      this.currentPerfil.foto_usuario = 'data:image/png;base64,' + this.currentPerfil.foto_usuario;
      if (this.currentPerfil.id_consultorio !== null) {
        this.isConsultorio = true;
      }
    });
  }

  ngOnInit() {
  }

  quitarConsultorio(idPerfil, idConsultorio) {
    this.cs.putConsultorioRemove(idPerfil, idConsultorio).subscribe(response => {
      if ( response.notifications.code === 'CHIDO') {
        this.isConsultorio = false;
        this.router.navigate(['/personal', idPerfil]);
      }
    });
  }

}
