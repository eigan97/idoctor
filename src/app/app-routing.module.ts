import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPacientesComponent } from './modules/pacientes/components/lista-pacientes/lista-pacientes.component';
import { PacienteNombreComponent } from './modules/pacientes/components/paciente-nombre/paciente-nombre.component';
import { ListaConsultasComponent } from './modules/consultas/components/lista-consultas/lista-consultas.component';
import { ConsultaNombreComponent } from './modules/consultas/components/consulta-nombre/consulta-nombre.component';
import { ConsultaNuevoComponent } from './modules/consultas/components/consulta-nuevo/consulta-nuevo.component';
import { ListaExamenesComponent } from './modules/examenes/components/lista-examenes/lista-examenes.component';
import { ExamenNuevoComponent } from './modules/examenes/components/examen-nuevo/examen-nuevo.component';
import { ExamenFolioComponent } from './modules/examenes/components/examen-folio/examen-folio.component';
import { LoginComponent } from './modules/login/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserComponent } from './shared/components/user/user.component';
import { PacientesNuevoComponent } from './modules/pacientes/components/pacientes-nuevo/pacientes-nuevo.component';
import { PacientesComponent } from './modules/pacientes/pacientes.component';
import { PersonalComponent } from './modules/personal/personal.component';
import { PersonalNuevoComponent } from './modules/personal/components/personal-nuevo/personal-nuevo.component';
import { PersonalFolioComponent } from './modules/personal/components/personal-folio/personal-folio.component';
import { ConsultasComponent } from './modules/consultas/consultas.component';
import { ExamenesComponent } from './modules/examenes/examenes.component';
import { LoginGuard } from './shared/guards/loginGuard/login.guard';
import { LogoutGuard } from './shared/guards/loginGuard/logout.guard';
import { PersonalListComponent } from './modules/personal/components/personal-list/personal-list.component';
import { PersonalCitaComponent } from './modules/personal/components/personal-cita/personal-cita.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: UserComponent,  canActivate: [LoginGuard], children: [
    { path: 'pacientes', component: PacientesComponent, children: [
      { path: '', component: ListaPacientesComponent },
      { path: 'new', component: PacientesNuevoComponent },
      { path: ':name', component: PacienteNombreComponent }

    ]},
    { path: 'consultas', component: ConsultasComponent, children: [
      { path: '', component: ListaConsultasComponent },
      { path: 'new', component: ConsultaNuevoComponent },
      { path: ':name', component: ConsultaNombreComponent }
    ]},
    { path: 'examenes', component: ExamenesComponent, children: [
      { path: '', component: ListaExamenesComponent },
      { path: 'new', component: ExamenNuevoComponent },
      { path: ':folio', component: ExamenFolioComponent }
    ]},
    { path: 'personal', component: PersonalComponent, children: [
      { path: '', component: PersonalListComponent },
      { path: 'new', component: PersonalNuevoComponent },
      { path: 'cita/:folio', component: PersonalCitaComponent },
      { path: ':folio', component: PersonalFolioComponent },
    ]}
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
