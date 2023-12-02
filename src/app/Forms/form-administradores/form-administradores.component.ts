import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { administradoresModel } from 'src/app/Models/AdministradoresModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-administradores',
  templateUrl: './form-administradores.component.html',
  styleUrls: ['./form-administradores.component.css']
})
export class FormAdministradoresComponent implements OnInit {
  constructor(
    private api: RestService,
    private ref: MatDialogRef<FormAdministradoresComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  administradoresForm = new FormGroup({
    idUsuario: new FormControl<number>(null, [Validators.required]),
    nombre: new FormControl<string>('', [Validators.required]),
    telefono: new FormControl<string>(''),
    //estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: administradoresModel = await this.api.getById("administradores", id);
    this.administradoresForm.controls.idUsuario.setValue(objeto.idUsuario);
    this.administradoresForm.controls.nombre.setValue(objeto.nombre);
    this.administradoresForm.controls.telefono.setValue(objeto.telefono);
    //this.administradoresForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.administradoresForm.valid) {
      let enviar = new administradoresModel();
      enviar.idUsuario = this.administradoresForm.controls.idUsuario.value;
      enviar.nombre = this.administradoresForm.controls.nombre.value;
      enviar.telefono = this.administradoresForm.controls.telefono.value;
      enviar.estado = "A";

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('administradores', this.data.id, enviar);
      } else {
        await this.api.post('administradores', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
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
