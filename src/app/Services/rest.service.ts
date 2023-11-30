import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }
  url = "https://localhost:7118/api/";

  public async get ( controller: string){
    var response:any
    await this.api.get(this.url+controller).toPromise().then((res)=>{
      response=res
      console.log(res);
    });
    return response
  }
  public async getById(controller: string, id: number){
    var response:any
    await this.api.get(this.url+controller+"/"+id).toPromise().then((res)=>{
      response=res
      console.log(res);
    });
    return response
  }
  public async post ( controller: string, text: any){
    await this.api.post(this.url+controller, text).toPromise().then((res)=>{
      console.log(res);
    });
  }
  public async put ( controller: string, id: string, text: any){
    await this.api.put(this.url+controller+'/'+id, text).toPromise().then((res)=>{
      console.log(res);
    });
  }
 
  public async delete(controller: string, id: string, text: any = {}) {
    await this.api.delete(this.url+controller+'/'+id, text).toPromise().then((res)=>{
      console.log(res);
    });
  }
}