import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit{

  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.get();
  }
  public get (){
    this.api.get('Supervisors');
  }
}
