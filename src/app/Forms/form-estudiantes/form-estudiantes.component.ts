import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { estudiantesModel } from 'src/app/Models/EstudiantesModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estudiantes',
  templateUrl: './form-estudiantes.component.html',
  styleUrls: ['./form-estudiantes.component.css'],
})
export class FormEstudiantesComponent implements OnInit{
  constructor(private api: RestService, private ref: MatDialogRef<FormEstudiantesComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  estudiantesForm = new FormGroup({
    idUsuario: new FormControl<number>(null, [Validators.required]),
    nombre: new FormControl<string>('', [Validators.required]),
    telefono: new FormControl<string>(''),
    tipoIdentificacion: new FormControl<string>('', [Validators.required]),
    identificacion: new FormControl<number>(null, [Validators.required]),
    idPrograma: new FormControl<number>(null, [Validators.required]),
    idProyecto: new FormControl<number>(null, [Validators.required]),
    estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  identificacion = [  
    { name: 'Ninguno' },
    { name: 'Tarjeta de identidad', abbreviation: 'TI' },
    { name: 'Cédula de ciudadanía', abbreviation: 'CC' },
  ];

  async cargarform(id: number) {
    const objeto: estudiantesModel = await this.api.getById("estudiantes", id);
    this.estudiantesForm.controls.idUsuario.setValue(objeto.idUsuario);
    this.estudiantesForm.controls.nombre.setValue(objeto.nombre);
    this.estudiantesForm.controls.telefono.setValue(objeto.telefono);
    this.estudiantesForm.controls.tipoIdentificacion.setValue(objeto.tipoIdentificacion);
    this.estudiantesForm.controls.identificacion.setValue(objeto.identificacion);
    this.estudiantesForm.controls.idPrograma.setValue(objeto.idPrograma);
    this.estudiantesForm.controls.idProyecto.setValue(objeto.idProyecto);
    this.estudiantesForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.estudiantesForm.valid) {
      let enviar = new estudiantesModel();
      enviar.idUsuario = this.estudiantesForm.controls.idUsuario.value;
      enviar.nombre = this.estudiantesForm.controls.nombre.value;
      enviar.telefono = this.estudiantesForm.controls.telefono.value;
      enviar.tipoIdentificacion = this.estudiantesForm.controls.tipoIdentificacion.value;
      enviar.identificacion = this.estudiantesForm.controls.identificacion.value;
      enviar.idPrograma = this.estudiantesForm.controls.idPrograma.value;
      enviar.idProyecto = this.estudiantesForm.controls.idProyecto.value;
      enviar.estado = this.estudiantesForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('estudiantes', this.data.id, enviar);
      } else {
        await this.api.post('estudiantes', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Felicidades', 'Dato enviado', 'success');
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
