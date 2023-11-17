import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { FormsService } from 'src/app/Services/forms.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-from-programa',
  templateUrl: './from-programa.component.html',
  styleUrls: ['./from-programa.component.css']
})
export class FromProgramaComponent implements OnInit {
  private fb = inject(FormBuilder);
  formularioProgramas = this.fb.group({
    program: [null, Validators.required],
    descripcion: [null, Validators.required],
    facultad: [null, Validators.required],
       
  });


  constructor(public FormService:FormsService) {
  
  
}
title:string;
  ngOnInit(): void {
    if(this.FormService.title=='Editar'){
      this.title='Editar';

    } else if(this.FormService.title=='Crear'){
      this.title='Crear';

    }
  }

  onSubmit(): void {
    if(this.formularioProgramas.valid){
      Swal.fire('Felicidades','Registro exitoso','success')
    }else {
      Swal.fire('Peligro','Registro incorrecto','error')
    }
  }
  
}
