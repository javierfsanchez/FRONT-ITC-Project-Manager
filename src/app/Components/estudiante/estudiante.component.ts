import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})

export class EstudianteComponent implements OnInit {

    constructor(public api: RestService){
  
    }
    ngOnInit(): void {
      this.get();
    }
    public get (){
      this.api.get('Estudiantes');
    } 
  }