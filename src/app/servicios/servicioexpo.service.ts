import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams,} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioexpoService {

  constructor(private http: HttpClient) { }
  validarrecaptcha(tokenrecaptch :string){
    const params= new HttpParams();
    params.set('secret','6LfYI14aAAAAAFtNon_zACPSp83nqoKGWJk8IgLU');
    params.set('response', tokenrecaptch);
    let headers= new HttpHeaders();
   
    headers= headers.append('Content-Type', 'application/x-www-form-urlencoded');
   // headers= headers.append('Access-Control-Allow-Origin', '*');
    return new Promise((resolve, reject)=>{
      
     this.http.post('https://www.google.com/recaptcha/api/siteverify',{params},{headers:headers}).subscribe(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
     );
    })
  }
}
