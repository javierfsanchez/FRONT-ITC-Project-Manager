import { Injectable } from '@angular/core';
import { ProgramasMV } from '../Models/ProgramasMV';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }
  title:string;
  Programas:ProgramasMV;
}

