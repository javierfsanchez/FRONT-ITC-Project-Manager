import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { programasModel } from 'src/app/Models/programasModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from-programa',
  templateUrl: './from-programa.component.html',
  styleUrls: ['./from-programa.component.css']
})
export class FromProgramaComponent implements OnInit {
  constructor(private api: RestService, private ref: MatDialogRef<FromProgramaComponent>, @Inject(MAT_DIALOG_DATA)private data: any){}

  programasForm = new FormGroup({
    nombrePrograma: new FormControl<string>(null, [Validators.required]),
    descripcion: new FormControl<string>(null, [
      Validators.required,
      Validators.maxLength(30),
    ]),
    id_Facultad: new FormControl<string>(null, [Validators.required]),
    estado: new FormControl<string>(null, [Validators.required]),
  });

  ngOnInit(): void {
    console.log(this.data.id);
    if (Boolean(this.data.id)){
      this.cargarform(this.data.id);
    }
  }
  async cargarform(id: number){
    let objeto:programasModel = await this.api.getById("programas",id);
    this.programasForm.controls.nombrePrograma.setValue(objeto.nombrePrograma);
    this.programasForm.controls.descripcion.setValue(objeto.descripcion);
    this.programasForm.controls.id_Facultad.setValue(objeto.idFacultad);
    this.programasForm.controls.estado.setValue(objeto.estado);
  }

  hasUnitNumber = false;

  async onSubmit() {
    if (this.programasForm.valid) {
      let nuevo = new programasModel();
      nuevo.nombrePrograma = this.programasForm.controls.nombrePrograma.value;
      nuevo.descripcion = this.programasForm.controls.descripcion.value;
      nuevo.idFacultad = this.programasForm.controls.id_Facultad.value;
      nuevo.estado = this.programasForm.controls.estado.value;
      if (Boolean(this.data.id)){
        nuevo.id=this.data.id;
        await this.api.put('programas', this.data.id, nuevo);
      }else{
        await this.api.post('programas', nuevo);
      }
      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.programasForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.programasForm.controls[formControl].hasError('maxlength')) {
      let valor = this.programasForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.programasForm.controls[formControl].hasError('minlength')) {
      let valor = this.programasForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.programasForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
