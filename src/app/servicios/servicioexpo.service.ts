import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams,} from "@angular/common/http";
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
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
  login(data:any){
    return new Promise((resolve, reject) => {
      this.http.post(environment.Api_Url +'Usuarios/authenticate',data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  CheckToken():void {
    
    const UserToken= localStorage.getItem('Token');
    const IsExpired=helper.isTokenExpired(UserToken);
    if(IsExpired){
        localStorage.removeItem('Token');            
    }
  }

  ObtenerValores(){
    const token= localStorage.getItem('Token');
    let headers= new HttpHeaders();
    headers= headers.append('Authorization','bearer '+token);
    return new Promise((resolve, reject) => {
      this.http.get(environment.Api_Url +'Usuarios',{headers:headers}).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
