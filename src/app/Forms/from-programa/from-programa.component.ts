import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-programa',
  templateUrl: './from-programa.component.html',
  styleUrls: ['./from-programa.component.css']
})
export class FromProgramaComponent {
  private fb = inject(FormBuilder);
  formularioProgramas = this.fb.group({
    program: [null, Validators.required],
    descripcion: [null, Validators.required],
    facultad: [null, Validators.required],
       
  });

  onSubmit(): void {
    if(this.formularioProgramas.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
  
}
