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
  public async post ( controller: string, text: any){
    await this.api.post(this.url+controller, text).toPromise().then((res)=>{
      console.log(res);
    });
  }
  public async put ( controller: String, id: string, text: any){
    await this.api.put(this.url+controller+'/'+id, text).toPromise().then((res)=>{
      console.log(res);
    });
  }
  public async delete ( controller: String, id: string){
    await this.api.delete(this.url+controller+'/'+id).toPromise().then((res)=>{
      console.log(res);
    });
  }
}