import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-proyecto',
  templateUrl: './from-proyecto.component.html',
  styleUrls: ['./from-proyecto.component.css']
})
export class FromProyectoComponent {
  private fb = inject(FormBuilder);
    formularioProyecto = this.fb.group({
      proyect: [null, Validators.required],
      motivo: [null, Validators.required],
      docente: [null, Validators.required],
         
    });
  
    onSubmit(): void {
      if(this.formularioProyecto.valid){
        Swal.fire('Felicidades','Registro exitoso','success')
      }else {
        Swal.fire('Peligro','Registro incorrecto','error')
      }
    }
}
