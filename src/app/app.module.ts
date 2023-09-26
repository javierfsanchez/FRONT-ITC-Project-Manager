import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AvatarModule } from 'ngx-avatars';
import { ActividadComponent } from './Components/actividad/actividad.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { DocenteComponent } from './Components/docente/docente.component';
import { EstudianteComponent } from './Components/estudiante/estudiante.component';
import { FacultadComponent } from './Components/facultad/facultad.component';
import { ObservacionComponent } from './Components/observacion/observacion.component';
import { PresentacionComponent } from './Components/presentacion/presentacion.component';
import { ProyectoComponent } from './Components/proyecto/proyecto.component';
import { SupervisorComponent } from './Components/supervisor/supervisor.component';
import { TarjetaComponent } from './Components/tarjeta/tarjeta.component';
import { ProgramaComponent } from './Components/programa/programa.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    MenuComponent,
    ActividadComponent,
    AdministradorComponent,
    DocenteComponent,
    EstudianteComponent,
    FacultadComponent,
    ObservacionComponent,
    PresentacionComponent,
    ProyectoComponent,
    SupervisorComponent,
    TarjetaComponent,
    ProgramaComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
