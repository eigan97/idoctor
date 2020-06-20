import { Component, OnInit } from '@angular/core';
import { ConsultoriosService } from 'src/app/shared/services/consultoriosService/consultorios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-cita',
  templateUrl: './personal-cita.component.html',
  styleUrls: ['./personal-cita.component.css']
})
export class PersonalCitaComponent implements OnInit {
  consultorios: any;
  idConsultorio = 'Asignar Consultorio';
  idPerfil: number;
  constructor(private cs: ConsultoriosService, private router: Router) {
    this.idPerfil = +this.router.url.split('/')[3];
    this.cs.getConsultorios().subscribe(response => {
      this.consultorios = response.data.consulta;
    });
   }

  ngOnInit() {
  }

  addConsultorio() {
    this.cs.putConsultorio(this.idPerfil, this.idConsultorio).subscribe(response => {
      this.router.navigate(['/personal', this.idPerfil]);
    });
  }

}
