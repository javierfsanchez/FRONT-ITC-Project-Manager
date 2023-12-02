import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { facultadesModel } from 'src/app/Models/facultadesModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-facultad',
  templateUrl: './form-facultad.component.html',
  styleUrls: ['./form-facultad.component.css']
})
export class FormFacultadComponent implements OnInit{
  constructor(private api: RestService, private ref: MatDialogRef<FormFacultadComponent>, @Inject(MAT_DIALOG_DATA)private data: any){}

  ngOnInit(): void {
    console.log(this.data.id);
    if (Boolean(this.data.id)){
      this.cargarform(this.data.id);
    }
  }
  async cargarform(id: number){
    let objeto:facultadesModel = await this.api.getById("facultades",id);
    this.facultadesForm.controls.nombre.setValue(objeto.nombre);
    this.facultadesForm.controls.descripcion.setValue(objeto.descripcion);
    this.facultadesForm.controls.telefono_contacto.setValue(objeto.telefonoContacto);
    this.facultadesForm.controls.correo.setValue(objeto.correo);
  }

  facultadesForm = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    telefono_contacto: new FormControl<string>(null, [Validators.required]),
    descripcion: new FormControl<string>(null, [
      Validators.required,
      Validators.maxLength(30),
    ]),
    correo: new FormControl<string>(null, [Validators.required]),
  });

  hasUnitNumber = false;

  async onSubmit() {
    if (this.facultadesForm.valid) {
      let nuevo = new facultadesModel();
      nuevo.nombre = this.facultadesForm.controls.nombre.value;
      nuevo.descripcion = this.facultadesForm.controls.descripcion.value;
      nuevo.telefonoContacto = this.facultadesForm.controls.telefono_contacto.value;
      nuevo.correo = this.facultadesForm.controls.correo.value;
      nuevo.estado = "A";
      
      if (Boolean(this.data.id)){
        nuevo.id=this.data.id;
        await this.api.put('Facultades', this.data.id, nuevo);
      }else{
        await this.api.post('Facultades', nuevo);
      }
      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
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
