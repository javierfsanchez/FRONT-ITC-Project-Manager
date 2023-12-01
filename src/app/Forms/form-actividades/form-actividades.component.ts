import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { actividadesModel } from 'src/app/Models/ActividadesModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.css']
})
export class FormActividadesComponent implements OnInit{
  constructor(private api: RestService, private ref: MatDialogRef<FormActividadesComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  actividadesForm = new FormGroup({
    idEstudiante: new FormControl<number>(null, [Validators.required]),
    tituloActividad: new FormControl<string>('', [Validators.required]),
    descripcion: new FormControl<string>(''),
    horas: new FormControl<Date>(null, [Validators.required]),
    terminar: new FormControl<Date>(null),
    estado: new FormControl<string>('', [Validators.required])
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: actividadesModel = await this.api.getById("actividades", id);
    this.actividadesForm.controls.idEstudiante.setValue(objeto.idEstudiante);
    this.actividadesForm.controls.tituloActividad.setValue(objeto.tituloActividad);
    this.actividadesForm.controls.descripcion.setValue(objeto.descripcion);
    this.actividadesForm.controls.horas.setValue(objeto.horas);
    this.actividadesForm.controls.terminar.setValue(objeto.terminar);
    this.actividadesForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.actividadesForm.valid) {
      let nuevo = new actividadesModel();
      nuevo.idEstudiante = this.actividadesForm.controls.idEstudiante.value;
      nuevo.tituloActividad = this.actividadesForm.controls.tituloActividad.value;
      nuevo.descripcion = this.actividadesForm.controls.descripcion.value;
      nuevo.horas = this.actividadesForm.controls.horas.value;
      nuevo.terminar = this.actividadesForm.controls.terminar.value;
      nuevo.estado = this.actividadesForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        nuevo.id=this.data.id;
        await this.api.put('actividades', this.data.id, nuevo);
      } else {
        await this.api.post('actividades', nuevo);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Felicidades', 'Dato enviado', 'success');
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
