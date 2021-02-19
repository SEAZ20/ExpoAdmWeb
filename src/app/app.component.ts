import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioexpoService } from './servicios/servicioexpo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'ExpoJwt';
  siteKey:string="6LfYI14aAAAAAKbQbdMbAE7aTW67wVpi-v5KTxdb";
  aFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private ser : ServicioexpoService,
    private route: Router
    ){
   
  }

  ngOnInit() {
    this.ser.CheckToken();
    this.aFormGroup = this.formBuilder.group({
      usuario:['',Validators.required],
      password:['', Validators.required],
      // recaptcha: ['', Validators.required]
    });
    localStorage.removeItem("Token");
  }
  codigo:string;
  TokenGenerado:string;
  guardar(){
    let data = this.aFormGroup.value;
    if (this.aFormGroup.invalid) { 
      alert("faltan ingresar datos") 
    }else{
        this.ser.login(data).then((result)=>{
          
          this.codigo=result["codigo"];

          if (this.codigo=="200") {
            localStorage.setItem("Token",result["data"].token);  
            this.TokenGenerado=localStorage.getItem("Token");    
            this.route.navigate(['inicio']);
          } else {

            alert("Usuario o contraseña incorrectos");
          }
        });
    }
    console.log(data);
    // this.ser.validarrecaptcha(data.recaptcha).then((result)=>{
    //   console.log(result);
    // })
    //https://www.google.com/recaptcha/api/siteverify?secret=6LfYI14aAAAAAFtNon_zACPSp83nqoKGWJk8IgLU&response=${data.recaptcha}
  }
  
}
