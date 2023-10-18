import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './Components/actividad/actividad.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { DocenteComponent } from './Components/docente/docente.component';
import { EstudianteComponent } from './Components/estudiante/estudiante.component';
import { FacultadComponent } from './Components/facultad/facultad.component';
import { ObservacionComponent } from './Components/observacion/observacion.component';
import { PresentacionComponent } from './Components/presentacion/presentacion.component';
import { ProgramaComponent } from './Components/programa/programa.component';
import { ProyectoComponent } from './Components/proyecto/proyecto.component';
import { SupervisorComponent } from './Components/supervisor/supervisor.component';
import { TarjetaComponent } from './Components/tarjeta/tarjeta.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { FormUsuarioComponent } from './Forms/form-usuario/form-usuario.component';
import { FormEstudiantesComponent } from './Forms/form-estudiantes/form-estudiantes.component';
import { FormAdministradoresComponent } from './Forms/form-administradores/form-administradores.component';
import { FormDocentesComponent } from './Forms/form-docentes/form-docentes.component';
import { FormFacultadComponent } from './Forms/form-facultad/form-facultad.component';
import { FormActividadesComponent } from './Forms/form-actividades/form-actividades.component';

const routes: Routes = [
  {path: 'Actividades',component:ActividadComponent},
  {path: 'Administradores',component:AdministradorComponent},
  {path: 'Docentes',component:DocenteComponent},
  {path: 'Estudiantes',component:EstudianteComponent},
  {path: 'Facultades',component:FacultadComponent},
  {path: 'Observaciones',component:ObservacionComponent},
  {path: 'Presentaciones',component:PresentacionComponent},
  {path: 'Programas',component:ProgramaComponent},
  {path: 'Proyectos',component:ProyectoComponent},
  {path: 'Supervisores',component:SupervisorComponent},
  {path: 'Tarjetas',component:TarjetaComponent},
  {path: 'Usuarios',component:UsuarioComponent},
  {path: 'form-usuario',component:FormUsuarioComponent},
  {path: 'form-actividades',component:FormActividadesComponent},
  {path: 'form-administradores',component:FormAdministradoresComponent},
  {path: 'form-docentes',component:FormDocentesComponent},
  {path: 'form-estudiantes',component:FormEstudiantesComponent},
  {path: 'form-facultades',component:FormFacultadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }