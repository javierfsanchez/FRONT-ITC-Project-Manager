import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { supervisoresModel } from 'src/app/Models/SupervisoresModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from-supervisor',
  templateUrl: './from-supervisor.component.html',
  styleUrls: ['./from-supervisor.component.css']
})
export class FromSupervisorComponent implements OnInit{
  constructor(
    private api: RestService,
    private ref: MatDialogRef<FromSupervisorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  supervisoresForm = new FormGroup({
    idProyecto: new FormControl<number>(null, [Validators.required]),
    motivo: new FormControl<string>('', [Validators.required]),
    idDocente: new FormControl<number>(null, [Validators.required]),
    estado: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {
    if (Boolean(this.data.id)) {
      this.cargarform(this.data.id);
    }
  }

  async cargarform(id: number) {
    const objeto: supervisoresModel = await this.api.getById("supervisores", id);
    this.supervisoresForm.controls.idProyecto.setValue(objeto.idProyecto);
    this.supervisoresForm.controls.motivo.setValue(objeto.motivo);
    this.supervisoresForm.controls.idDocente.setValue(objeto.idDocente);
    this.supervisoresForm.controls.estado.setValue(objeto.estado);
  }

  async onSubmit() {
    if (this.supervisoresForm.valid) {
      let enviar = new supervisoresModel();
      enviar.idProyecto = this.supervisoresForm.controls.idProyecto.value;
      enviar.motivo = this.supervisoresForm.controls.motivo.value;
      enviar.idDocente = this.supervisoresForm.controls.idDocente.value;
      enviar.estado = this.supervisoresForm.controls.estado.value;

      if (Boolean(this.data.id)) {
        enviar.id = this.data.id;
        await this.api.put('supervisores', this.data.id, enviar);
      } else {
        await this.api.post('supervisores', enviar);
      }

      this.ref.close();
      Swal.fire('Felicidades', 'Dato enviado', 'success');
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  public mensajeDeError(formControl: string): string {
    if (this.supervisoresForm.controls[formControl].hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.supervisoresForm.controls[formControl].hasError('maxlength')) {
      let valor = this.supervisoresForm.controls[formControl].errors['maxlength'].requiredLength;
      return 'Máximo de ' + valor + ' carácteres';
    }
    if (this.supervisoresForm.controls[formControl].hasError('minlength')) {
      let valor = this.supervisoresForm.controls[formControl].errors['minlength'].requiredLength;
      return 'Mínimo de ' + valor + ' carácteres';
    }
    if (this.supervisoresForm.controls[formControl].hasError('pattern')) {
      return 'Este campo solo puede contener números';
    }
    return '';
  }
}
