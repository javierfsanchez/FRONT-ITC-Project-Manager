import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-docentes',
  templateUrl: './form-docentes.component.html',
  styleUrls: ['./form-docentes.component.css']
})
export class FormDocentesComponent {
  constructor(){}

  docentesForm = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    apellido: new FormControl<string>(null, [Validators.required]),
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
    if (this.docentesForm.valid) {
      Swal.fire('Felicidades', 'Registro exitoso', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.docentesForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.docentesForm.controls[formControl].hasError('maxlength')) {
      let valor =
        this.docentesForm.controls[formControl].errors['maxlength']
          .requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.docentesForm.controls[formControl].hasError('minlength')) {
      let valor =
        this.docentesForm.controls[formControl].errors['minlength']
          .requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.docentesForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
