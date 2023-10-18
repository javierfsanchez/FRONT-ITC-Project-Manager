import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-presentacion',
  templateUrl: './from-presentacion.component.html',
  styleUrls: ['./from-presentacion.component.css']
})
export class FromPresentacionComponent {
  private fb = inject(FormBuilder);
  formularioPresentaciones = this.fb.group({
    presentacion: [null, Validators.required],
    salon: [null, Validators.required],
    project: [null, Validators.required],
    docente: [null, Validators.required],
       
  });

  onSubmit(): void {
    if(this.formularioPresentaciones.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
}
