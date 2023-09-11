import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit{

  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.get();
  }
  public get (){
    this.api.get('Presentacions');
  }
}
