import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;
    constructor(public api: RestService){
    this.dataSource = new MatTableDataSource();
    }
    ngOnInit(): void {
      this.api.get('Supervisores').then((res)=>{
      for (let index = 0; index < res.length; index++){
        this.loadTable([res[index]])
      }
  
     this.dataSource.data=res
      
  
      console.log(res);
  
      })
    }
  
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    }
    
    loadTable(data:any[]){
      this.displayedColumns=[];
      for(let column in data[0]){
        this.displayedColumns.push(column)
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
