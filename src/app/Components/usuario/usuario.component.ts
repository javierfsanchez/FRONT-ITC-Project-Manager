import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  constructor(public api: RestService) {}
  ngOnInit(): void {
    this.get();
  }
  public get() {
    this.api.get('Usuarios');
  }
  public post() {
    this.api.post('Usuarios', {
      Correo: 'jfsanchezi@itc.edu.co',
      Contraseña: '000000'
    });
  }
  public put() {
    this.api.put('Usuarios', '1',{
      Correo: 'jfsanchezi@itc.edu.co',
      Contraseña: '000000'
    });
  }
  public delete() {
    this.api.delete('Usuarios', '1');
  }
}
