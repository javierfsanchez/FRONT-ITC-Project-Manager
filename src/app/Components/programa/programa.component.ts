import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit{

  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.get();
  }
  public get (){
    this.api.get('Programas');
  }
}
