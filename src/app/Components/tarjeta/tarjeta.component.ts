import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit{

  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.get();
  }
  public get (){
    this.api.get('Tarjetas');
  }
}
