import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Programas } from 'src/app/Models/Programas';
import { FormsService } from 'src/app/Services/forms.service';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-programa',
  templateUrl: './from-programa.component.html',
  styleUrls: ['./from-programa.component.css']
})
export class FromProgramaComponent implements OnInit {
  private fb = inject(FormBuilder);
  formularioProgramas = this.fb.group({
    program: ['', Validators.required],
    descripcion: ['', Validators.required],
    facultad: ['', Validators.required],
       
  });


  constructor(public FormService:FormsService, public api:RestService) {
  
  
}
title:string;
  ngOnInit(): void {
    if(this.FormService.title=='Editar'){
      this.title='Editar';
      this.formularioProgramas.setControl('program', new FormControl(this.FormService.Programas.nombre_Programa));
      this.formularioProgramas.setControl('descripcion', new FormControl(this.FormService.Programas.descripcion));
      this.formularioProgramas.setControl('facultad', new FormControl(this.FormService.Programas.facultad));
    } else if(this.FormService.title=='Crear'){
      this.title='Crear';

    }
  }

  onSubmit(): void {
    if(this.formularioProgramas.valid){
      if(this.FormService.title=='Editar'){
        let object:Programas = {
          id:Number(this.FormService.Programas.codigo),
          nombre_Programa:this.formularioProgramas.controls['program'].value,
          descripcion:this.formularioProgramas.controls['descripcion'].value,
          facultad:this.formularioProgramas.controls['facultad'].value,
          estado:this.FormService.Programas.estado       

        }
        this.api.put('Programas', this.FormService.Programas.codigo.toString(), object);


      }
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
  
}
