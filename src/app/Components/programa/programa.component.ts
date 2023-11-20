import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { FromProgramaComponent } from 'src/app/Forms/from-programa/from-programa.component';
import { FormsService } from 'src/app/Services/forms.service';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})

export class ProgramaComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [];  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;

    constructor(public FromServices:FormsService, public api: RestService, public dialog: MatDialog){
      this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
      this.get();
      
    }
    
    public get(){
      this.api.get('Programas').then((res)=>{
      for (let index = 0; index < res.length; index++){
        this.loadTable([res[index]])
      }
      this.dataSource.data=res
        console.log(res);
      })
    }

    public deleteRegistro(id: number) {
      console.log(id);
      Swal.fire({
          title: '¿Está seguro eliminar el registro?',
          text: "No podrá revertir esta operación.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#5f5ffd',
          cancelButtonColor: '#ff5e5e',
          confirmButtonText: 'Eliminar'
      }).then((result) => {
          if (result.isConfirmed) {
              this.api.delete('Programas', id.toString(), { activo: false }) // Llama al método Put para marcar el estudiante como inactivo
                  .then(() => {
                      Swal.fire(
                          'Eliminado!',
                          `El registro con el id ${id} ha sido eliminado.`,
                          'success'
                      );
                      setInterval(() => {
                          window.location.reload();
                      }, 2000);
                  })
                  .catch((error) => {
                      console.error(error);
                      // Manejar el error aquí
                  });
          }
      });
      return false;
  }

    // deleteService(id){
    //   this.api.delete("Estudiantes/", id);
    // }

    public editarRegistro(id: number){
      this.FromServices.title='Editar';
      console.log(id);
    }
    
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    }
    
    loadTable(data:any[]){
      this.displayedColumns=[];
      if (data.length > 0) {
        for(let column in data[0]){
          this.displayedColumns.push(column);
        }
        this.displayedColumns.push("Acciones")
      }
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    openDialog() {
      this.FromServices.title='Crear';
      this.dialog.open(FromProgramaComponent, {
        width: '50%'
      });
    }
  }
