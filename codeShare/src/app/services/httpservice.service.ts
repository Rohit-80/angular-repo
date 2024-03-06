import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/utils/env';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http : HttpClient) {

   }


   addTextData(data : {[txt : string] : string}){
     return this.http.post(baseUrl+'txt.json',data);

   }

   getAllTextData(){
    return this.http.get(baseUrl+'txt.json');
   }

   deleteTxt(id:string){
     return this.http.delete(baseUrl+'txt/'+ id + '.json');
   }

   addImage(imgurl : string){
    return this.http.post(baseUrl+'images.json',{url : imgurl});
   }
  
   getAllImages(){
     return  this.http.get(baseUrl+'images.json');
   }

}
