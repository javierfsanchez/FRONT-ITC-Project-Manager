import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { tarjetasModel } from 'src/app/Models/TarjetasModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from-tarjetas',
  templateUrl: './from-tarjetas.component.html',
  styleUrls: ['./from-tarjetas.component.css']
})
export class FromTarjetasComponent {
  constructor(private api: RestService,private ref: MatDialogRef<FromTarjetasComponent>,@Inject(MAT_DIALOG_DATA) private data: any) { }

  tarjetasForm = new FormGroup({
    titulo: new FormControl<string>('', [Validators.required]),
    descripcion: new FormControl<string>(''),
    link: new FormControl<string>(''),
    extension: new FormControl<string>(''),
    observacion: new FormControl<string>('', [Validators.required]),
    fechaSubida: new FormControl<Date>(null, [Validators.required]),
    fechaTerminado: new FormControl<Date>(undefined),
    estadoTarjeta: new FormControl<string>('', [Validators.required]),
    estado: new FormControl<string>('', [Validators.required])
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    let objeto: tarjetasModel = await this.api.getById("tarjetas", id);
    this.tarjetasForm.controls.titulo.setValue(objeto.titulo);
    this.tarjetasForm.controls.descripcion.setValue(objeto.descripcion);
    this.tarjetasForm.controls.link.setValue(objeto.link);
    this.tarjetasForm.controls.extension.setValue(objeto.extension);
    this.tarjetasForm.controls.observacion.setValue(objeto.observacion);
    this.tarjetasForm.controls.fechaSubida.setValue(objeto.fechaSubida);
    this.tarjetasForm.controls.fechaTerminado.setValue(objeto.fechaTerminado);
    this.tarjetasForm.controls.estadoTarjeta.setValue(objeto.estadoTarjeta);
    this.tarjetasForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.tarjetasForm.valid) {
      let enviar = new tarjetasModel();
      enviar.titulo = this.tarjetasForm.controls.titulo.value;
      enviar.descripcion = this.tarjetasForm.controls.descripcion.value;
      enviar.link = this.tarjetasForm.controls.link.value;
      enviar.extension = this.tarjetasForm.controls.extension.value;
      enviar.observacion = this.tarjetasForm.controls.observacion.value;
      enviar.fechaSubida = this.tarjetasForm.controls.fechaSubida.value;
      enviar.fechaTerminado = this.tarjetasForm.controls.fechaTerminado.value;
      enviar.estadoTarjeta = this.tarjetasForm.controls.estadoTarjeta.value;
      enviar.estado = this.tarjetasForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        console.log(enviar);
        await this.api.put('tarjetas', enviar.id+'', enviar);
      } else {
        await this.api.post('tarjetas', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.tarjetasForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.tarjetasForm.controls[formControl].hasError('maxlength')) {
      let valor = this.tarjetasForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.tarjetasForm.controls[formControl].hasError('minlength')) {
      let valor = this.tarjetasForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.tarjetasForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
