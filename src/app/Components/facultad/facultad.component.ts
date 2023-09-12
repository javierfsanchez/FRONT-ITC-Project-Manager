import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})

export class FacultadComponent implements OnInit {

    constructor(public api: RestService){
  
    }
    ngOnInit(): void {
      this.get();
    }
    public get (){
      this.api.get('Facultads');
    } 
  }