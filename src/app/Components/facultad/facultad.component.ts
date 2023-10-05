import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})

<<<<<<< Updated upstream
export class FacultadComponent implements OnInit {
=======
export class FacultadComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public api: RestService){
  this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.api.get('Facultades').then((res)=>{
    for (let index = 0; index < res.length; index++){
      this.loadTable([res[index]])
    }
>>>>>>> Stashed changes

    constructor(public api: RestService){
  
    }
    ngOnInit(): void {
      this.get();
    }
    public get (){
      this.api.get('Facultads');
    } 
  }