import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})

export class ObservacionComponent implements OnInit {

    constructor(public api: RestService){
  
    }
    ngOnInit(): void {
      this.get();
    }
    public get (){
      this.api.get('Observación');
    } 
  }