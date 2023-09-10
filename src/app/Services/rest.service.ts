import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }
  url = "https://localhost:7288/api/"

  public async get ( controller: String){
    await this.api.get(this.url+controller).toPromise().then((res)=>{
      console.log(res);
    });
  }
}