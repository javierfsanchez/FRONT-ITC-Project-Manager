import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estudiantes',
  templateUrl: './form-estudiantes.component.html',
  styleUrls: ['./form-estudiantes.component.css'],
})
export class FormEstudiantesComponent {
  constructor() {}

  estudiantesForm = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    apellido: new FormControl<string>(null, [Validators.required]),
    celular: new FormControl<string>(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[1-9]\d{10,10}$/),
    ]),
    tipoidentificacion: new FormControl<string>(null, [Validators.required]),
    numeroidentificacion: new FormControl<string>(null,[
      Validators.required,
      Validators.pattern(/^[1-9]\d{1,50}$/)],   
    ),
  });

  hasUnitNumber = false;

  identificacion = [  
    { name: 'Ninguno' },
    { name: 'Tarjeta de identidad', abbreviation: 'TI' },
    { name: 'Cédula de ciudadanía', abbreviation: 'CC' },
  ];

  onSubmit(): void {
    if (this.estudiantesForm.valid) {
      Swal.fire('Felicidades', 'Registro exitoso', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.estudiantesForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.estudiantesForm.controls[formControl].hasError('maxlength')) {
      let valor =
        this.estudiantesForm.controls[formControl].errors['maxlength']
          .requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.estudiantesForm.controls[formControl].hasError('minlength')) {
      let valor =
        this.estudiantesForm.controls[formControl].errors['minlength']
          .requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.estudiantesForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
