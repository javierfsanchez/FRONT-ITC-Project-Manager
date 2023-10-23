import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-facultad',
  templateUrl: './form-facultad.component.html',
  styleUrls: ['./form-facultad.component.css']
})
export class FormFacultadComponent {
  constructor(){}

  facultadesForm = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    apellido: new FormControl<string>(null, [Validators.required]),
    celular: new FormControl<string>(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[1-9]\d{10,10}$/),
    ]),
    descripcion: new FormControl<String>(null, [
      Validators.required,
      Validators.maxLength(30),
    ])
  });

  hasUnitNumber = false;

  onSubmit(): void {
    if (this.facultadesForm.valid) {
      Swal.fire('Felicidades', 'Registro exitoso', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.facultadesForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.facultadesForm.controls[formControl].hasError('maxlength')) {
      let valor = this.facultadesForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.facultadesForm.controls[formControl].hasError('minlength')) {
      let valor = this.facultadesForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.facultadesForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
