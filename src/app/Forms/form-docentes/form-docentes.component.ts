import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { docentesModel } from 'src/app/Models/DocentesModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-docentes',
  templateUrl: './form-docentes.component.html',
  styleUrls: ['./form-docentes.component.css']
})
export class FormDocentesComponent {
  constructor(
    private api: RestService,
    private ref: MatDialogRef<FormDocentesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  docentesForm = new FormGroup({
    idUsuario: new FormControl<number>(null, [Validators.required]),
    nombre: new FormControl<string>('', [Validators.required]),
    identificacion: new FormControl<number>(null, [Validators.required]),
    idPresentacion: new FormControl<number>(null, [Validators.required]),
    estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: docentesModel = await this.api.getById("docentes", id);
    this.docentesForm.controls.idUsuario.setValue(objeto.idUsuario);
    this.docentesForm.controls.nombre.setValue(objeto.nombre);
    this.docentesForm.controls.identificacion.setValue(objeto.identificacion);
    this.docentesForm.controls.idPresentacion.setValue(objeto.idPresentacion);
    this.docentesForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.docentesForm.valid) {
      let enviar = new docentesModel();
      enviar.idUsuario = this.docentesForm.controls.idUsuario.value;
      enviar.nombre = this.docentesForm.controls.nombre.value;
      enviar.identificacion = this.docentesForm.controls.identificacion.value;
      enviar.idPresentacion = this.docentesForm.controls.idPresentacion.value;
      enviar.estado = this.docentesForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('docentes', this.data.id, enviar);
      } else {
        await this.api.post('docentes', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
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
