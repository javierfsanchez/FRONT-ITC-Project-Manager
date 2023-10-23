import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.css']
})
export class FormActividadesComponent {
  constructor(){}
  
  actividadesForm = new FormGroup({
    titulo: new FormControl<string>(null, [Validators.required]),
    descripcion: new FormControl<string>(null, [Validators.required]),
  });

  hasUnitNumber = false;

  onSubmit(): void {
    if (this.actividadesForm.valid) {
      Swal.fire('Felicidades', 'Registro exitoso', 'success');
    } 
    else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.actividadesForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.actividadesForm.controls[formControl].hasError('maxlength')) {
      let valor =
        this.actividadesForm.controls[formControl].errors['maxlength']
          .requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.actividadesForm.controls[formControl].hasError('minlength')) {
      let valor =
        this.actividadesForm.controls[formControl].errors['minlength']
          .requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.actividadesForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }

}
