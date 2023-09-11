import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{

  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.get();
  }
  public get (){
    this.api.get('Proyectoes');
  }
}
