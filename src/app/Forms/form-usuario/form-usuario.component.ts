import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  private fb = inject(FormBuilder);
  formularioUsuario = this.fb.group({
    firstName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
       
  });

  onSubmit(): void {
    if(this.formularioUsuario.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
}
