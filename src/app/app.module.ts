import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { FlexLayoutModule } from '@angular/flex-layout';
import { ListaConsultasComponent } from './modules/consultas/components/lista-consultas/lista-consultas.component';
import { ConsultaNombreComponent } from './modules/consultas/components/consulta-nombre/consulta-nombre.component';
import { ConsultaNuevoComponent } from './modules/consultas/components/consulta-nuevo/consulta-nuevo.component';
import { ListaPacientesComponent } from './modules/pacientes/components/lista-pacientes/lista-pacientes.component';
import { PacienteNombreComponent } from './modules/pacientes/components/paciente-nombre/paciente-nombre.component';
import { ListaExamenesComponent } from './modules/examenes/components/lista-examenes/lista-examenes.component';
import { ExamenNuevoComponent } from './modules/examenes/components/examen-nuevo/examen-nuevo.component';
import { ExamenFolioComponent } from './modules/examenes/components/examen-folio/examen-folio.component';
import { LoginComponent } from './modules/login/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserComponent } from './shared/components/user/user.component';
import { CardItemComponent } from './shared/components/card-item/card-item.component';
import { LoginService } from './modules/login/services/login.service';
import { PacientesNuevoComponent } from './modules/pacientes/components/pacientes-nuevo/pacientes-nuevo.component';
import { PacientesComponent } from './modules/pacientes/pacientes.component';
import { PersonalComponent } from './modules/personal/personal.component';
import { PersonalNuevoComponent } from './modules/personal/components/personal-nuevo/personal-nuevo.component';
import { PersonalFolioComponent } from './modules/personal/components/personal-folio/personal-folio.component';
import { ConsultasComponent } from './modules/consultas/consultas.component';
import { ExamenesComponent } from './modules/examenes/examenes.component';
import { UserService } from './shared/services/userService/user.service';
import { ExamenesService } from './shared/services/examenesService/examenes.service';
import { DatePipe } from '@angular/common';
import { DiagnosticosService } from './shared/services/diagnosticosService/diagnosticos.service';
import { PersonalListComponent } from './modules/personal/components/personal-list/personal-list.component';
import { PersonalCitaComponent } from './modules/personal/components/personal-cita/personal-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    ListaConsultasComponent,
    ConsultaNombreComponent,
    ConsultaNuevoComponent,
    ListaPacientesComponent,
    PacienteNombreComponent,
    ListaExamenesComponent,
    ExamenNuevoComponent,
    ExamenFolioComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserComponent,
    CardItemComponent,
    PacientesNuevoComponent,
    PacientesComponent,
    PersonalComponent,
    PersonalNuevoComponent,
    PersonalFolioComponent,
    ConsultasComponent,
    ExamenesComponent,
    PersonalListComponent,
    PersonalCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    UserService,
    ExamenesService,
    DiagnosticosService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
