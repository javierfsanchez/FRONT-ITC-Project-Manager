import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }
  url = "https://localhost:7121/api/"

  public async get ( controller: String){
    var result:any
    await this.api.get(this.url+controller).toPromise().then(x=>{
      result = x
      
    })
    return result;
    
  }
}
