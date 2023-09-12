import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

    constructor(public api: RestService){
  
    }
    ngOnInit(): void {
      this.get();
    }
    public get (){
      this.api.get('Actividads');
    } 
  }