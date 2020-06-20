import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/shared/services/pacientesService/pacientes.service';
import { ExamenesService } from 'src/app/shared/services/examenesService/examenes.service';
import { DiagnosticosService } from 'src/app/shared/services/diagnosticosService/diagnosticos.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-examen-folio',
  templateUrl: './examen-folio.component.html',
  styleUrls: ['./examen-folio.component.css']
})
export class ExamenFolioComponent implements OnInit {
  @ViewChild('pacienteBox', {static: false}) pacienteBox: ElementRef;
  @ViewChild('historialBox', {static: false}) historialBox: ElementRef;
  examenPaciente: any;
  diagPacientes: any;
  idExamen: number;
  aniosPaciente: number;
  resultado: string;
  currentUser: any;
  constructor(private router: Router, private ps: PacientesService, private es: ExamenesService,
              private ds: DiagnosticosService, private us: UserService) {
      this.currentUser = this.us.currentUser.consulta[0];
      this.idExamen = +this.router.url.split('/')[2];
      this.es.getExamenesId(this.idExamen).subscribe(response => {
        const años = new Date().getFullYear() - new Date(response.data.fecha_nacimiento_p).getFullYear();
        this.aniosPaciente = años;
        this.examenPaciente = response.data;
        this.examenPaciente.foto_paciente = 'data:image/png;base64,' + this.examenPaciente.foto_paciente;
        console.log(response.data);
      });
    }

    ngOnInit() {
    }

  crearResultado() {
    this.es.putExamen(this.resultado, this.idExamen).subscribe( response => {
      if (response.notifications.code === 'CHIDO') {
        this.router.navigate(['/examenes']);
      }
    });
    // this.ds.postDiag(this.diagnostico, this.examenPaciente.id_paciente).subscribe(response => {
    //   if (response.notifications.message === 'CONSULTA EXITOSA') {
    //     const inputElement: HTMLInputElement = document.getElementById('diagTextarea') as HTMLInputElement;
    //     inputElement.value = '';
    //     this.ds.getDiagPacientes(this.examenPaciente.id_paciente).subscribe(responseDiag => {
    //       this.diagPacientes = responseDiag.data.consulta;
    //     });
    //   } else {
    //     alert('No se creo el diagnostico');
    //   }
    // });
  }

  downloadAsPDF() {
    const doc = new jsPDF('l', 'mm');
    html2canvas(document.getElementById('full__container__main__content')).then((canvas) => {
      const dataURL = canvas.toDataURL();
      this.loadImage(dataURL).then((logo) => {
        doc.addImage(logo, 'PNG', 10, 10);
        doc.save(`examen-folio:${this.idExamen}.pdf`);
      });
      // doc.fromHTML(canvas, 10, 10, {pagesplit: true}, () => {
      //   doc.save(`examen-folio:${this.idExamen}.pdf`);
      // });
   });
    // const specialElementHandlers = {
    //   '#editor': (element, renderer) => {
    //     return true;
    //   }
    // };

    // const historialBox = this.historialBox.nativeElement;
    // const pacienteBox = this.pacienteBox.nativeElement;

    // doc.fromHTML(historialBox.innerHTML, 15, 15, {
    //   width: 190,
    //   elementHandlers: specialElementHandlers
    // });
  }
  loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    });
  }
}
