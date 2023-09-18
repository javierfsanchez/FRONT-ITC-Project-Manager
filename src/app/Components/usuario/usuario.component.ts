import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service'; //servicio que se utiliza para realizar solicitudes HTTP a un servidor

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
//declara que el componente implementa la interfaz OnInit, la cual es una interfaz que indica que un componente Angular se inicializa cuando se crea
export class UsuarioComponent implements OnInit { 

  constructor(public api: RestService){
  //el constructor inyecta el servicio RestService en la propiedad api  
  }
  //el método ngOnInit se ejecuta cuando el componente se inicia, es el lugar donde el componente puede realizar tareas de inicio
  //en este caso, el método llama a otro método, en este caso el get para obtener la información de la base de datos
  ngOnInit(): void {
    this.get();
  }
  //El método get() utiliza el servicio RestService para realizar la solicitud HTTP. 
  //El servicio RestService devuelve un Observable, que es un objeto que representa una secuencia de datos
  public get (){
    this.api.get('Usuarios');
  } 
}