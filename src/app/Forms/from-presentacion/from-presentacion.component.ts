import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { presentacionesModel } from 'src/app/Models/PresentacionesModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-presentacion',
  templateUrl: './from-presentacion.component.html',
  styleUrls: ['./from-presentacion.component.css']
})
export class FromPresentacionComponent implements OnInit {
  constructor(
    private api: RestService,
    private ref: MatDialogRef<FromPresentacionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  presentacionesForm = new FormGroup({
    diaPresentacion: new FormControl<Date>(null, [Validators.required]),
    salon: new FormControl<string>('', [Validators.required]),
    idProyecto: new FormControl<number>(null, [Validators.required]),
    idAdministrador: new FormControl<number>(null, [Validators.required]),
    estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: presentacionesModel = await this.api.getById("presentaciones", id);
    this.presentacionesForm.controls.diaPresentacion.setValue(objeto.diaPresentacion);
    this.presentacionesForm.controls.salon.setValue(objeto.salon);
    this.presentacionesForm.controls.idProyecto.setValue(objeto.idProyecto);
    this.presentacionesForm.controls.idAdministrador.setValue(objeto.idAdministrador);
    this.presentacionesForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.presentacionesForm.valid) {
      let enviar = new presentacionesModel();
      enviar.diaPresentacion = this.presentacionesForm.controls.diaPresentacion.value;
      enviar.salon = this.presentacionesForm.controls.salon.value;
      enviar.idProyecto = this.presentacionesForm.controls.idProyecto.value;
      enviar.idAdministrador = this.presentacionesForm.controls.idAdministrador.value;
      enviar.estado = this.presentacionesForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('presentaciones', this.data.id, enviar);
      } else {
        await this.api.post('presentaciones', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.presentacionesForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.presentacionesForm.controls[formControl].hasError('maxlength')) {
      let valor = this.presentacionesForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.presentacionesForm.controls[formControl].hasError('minlength')) {
      let valor = this.presentacionesForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.presentacionesForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}