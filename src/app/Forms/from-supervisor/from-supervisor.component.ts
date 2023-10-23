import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-supervisor',
  templateUrl: './from-supervisor.component.html',
  styleUrls: ['./from-supervisor.component.css']
})
export class FromSupervisorComponent {
  private fb = inject(FormBuilder);
  formularioSupervisor = this.fb.group({
    proyect: [null, Validators.required],
    motivo: [null, Validators.required],
    docente: [null, Validators.required],
       
  });

  onSubmit(): void {
    if(this.formularioSupervisor.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
}
