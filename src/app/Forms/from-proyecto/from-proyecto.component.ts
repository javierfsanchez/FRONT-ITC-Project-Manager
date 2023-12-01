import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { proyectosModel } from 'src/app/Models/ProyectosModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-proyecto',
  templateUrl: './from-proyecto.component.html',
  styleUrls: ['./from-proyecto.component.css']
})
export class FromProyectoComponent implements OnInit{
  constructor(private api: RestService, private ref: MatDialogRef<FromProyectoComponent>, @Inject(MAT_DIALOG_DATA)private data: any) { }

  proyectosForm = new FormGroup({
    nombre: new FormControl<string>('', [Validators.required]),
    descripcion: new FormControl<string>(''),
    numeroIntegrantes: new FormControl<number>(null, [Validators.required]),
    ultimaActualizacion: new FormControl<Date>(null, [Validators.required]),
    estadoProyecto: new FormControl<string>('', [Validators.required]),
    idTarjeta: new FormControl<number>(null, [Validators.required]),
    estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)){
      this.cargarform(this.data.id);
    }
  }
  async cargarform(id: number) {
    let objeto: proyectosModel = await this.api.getById("proyectos",id);
    this.proyectosForm.controls.nombre.setValue(objeto.nombre);
    this.proyectosForm.controls.descripcion.setValue(objeto.descripcion);
    this.proyectosForm.controls.numeroIntegrantes.setValue(objeto.numeroIntegrantes);
    this.proyectosForm.controls.ultimaActualizacion.setValue(objeto.ultimaActualizacion);
    this.proyectosForm.controls.estadoProyecto.setValue(objeto.estadoProyecto);
    this.proyectosForm.controls.idTarjeta.setValue(objeto.idTarjeta);
    this.proyectosForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.proyectosForm.valid) {
      let enviar = new proyectosModel();
      enviar.nombre = this.proyectosForm.controls.nombre.value;
      enviar.descripcion = this.proyectosForm.controls.descripcion.value;
      enviar.numeroIntegrantes = this.proyectosForm.controls.numeroIntegrantes.value;
      enviar.ultimaActualizacion = this.proyectosForm.controls.ultimaActualizacion.value;
      enviar.estadoProyecto = this.proyectosForm.controls.estadoProyecto.value;
      enviar.idTarjeta = this.proyectosForm.controls.idTarjeta.value;
      enviar.estado = this.proyectosForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('proyectos', this.data.id, enviar);
      } else {
        await this.api.post('proyectos', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.proyectosForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.proyectosForm.controls[formControl].hasError('maxlength')) {
      let valor = this.proyectosForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.proyectosForm.controls[formControl].hasError('minlength')) {
      let valor = this.proyectosForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.proyectosForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
