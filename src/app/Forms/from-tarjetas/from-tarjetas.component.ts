import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from-tarjetas',
  templateUrl: './from-tarjetas.component.html',
  styleUrls: ['./from-tarjetas.component.css']
})
export class FromTarjetasComponent {
  private fb = inject(FormBuilder);
    formularioTarjetas = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      link: [null, Validators.required],
      extension: [null, Validators.required],
      observation: [null, Validators.required],
      upload: [null, Validators.required],
      finish: [null, Validators.required],
      state: [null, Validators.required],
  });

  onSubmit(): void {
    if(this.formularioTarjetas.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
}
