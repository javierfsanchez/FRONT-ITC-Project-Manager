import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-administradores',
  templateUrl: './form-administradores.component.html',
  styleUrls: ['./form-administradores.component.css']
})
export class FormAdministradoresComponent {
  constructor() {}

  administradoresForm = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    apellido: new FormControl<string>(null, [Validators.required]),
    celular: new FormControl<string>(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[1-9]\d{9,11}$/),
    ]),
  });

  hasUnitNumber = false;

  onSubmit(): void {
    if (this.administradoresForm.valid) {
      Swal.fire('Felicidades', 'Registro exitoso', 'success');
    } 
    else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.administradoresForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.administradoresForm.controls[formControl].hasError('maxlength')) {
      let valor =
        this.administradoresForm.controls[formControl].errors['maxlength']
          .requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.administradoresForm.controls[formControl].hasError('minlength')) {
      let valor =
        this.administradoresForm.controls[formControl].errors['minlength']
          .requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.administradoresForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
