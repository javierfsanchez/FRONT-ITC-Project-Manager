import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { usuariosModel } from 'src/app/Models/UsuariosModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit{
  constructor(private api: RestService, private ref: MatDialogRef<FormUsuarioComponent>,@Inject(MAT_DIALOG_DATA) private data: any) { }

  usuariosForm = new FormGroup({
    correo: new FormControl<string>('', [Validators.required]),
    contraseña: new FormControl<string>('', [Validators.required]),
    //estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: usuariosModel = await this.api.getById("usuarios", id);
    this.usuariosForm.controls.correo.setValue(objeto.correo);
    this.usuariosForm.controls.contraseña.setValue(objeto.contraseña);
    
  }

  async onSubmit() {
    if (this.usuariosForm.valid) {
      let enviar = new usuariosModel();
      enviar.correo = this.usuariosForm.controls.correo.value;
      enviar.contraseña = this.usuariosForm.controls.contraseña.value;
      enviar.estado = "A";

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('usuarios', this.data.id, enviar);
      } else {
        await this.api.post('usuarios', enviar);
      }
      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.usuariosForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.usuariosForm.controls[formControl].hasError('maxlength')) {
      let valor = this.usuariosForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.usuariosForm.controls[formControl].hasError('minlength')) {
      let valor = this.usuariosForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.usuariosForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
