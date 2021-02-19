import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioexpoService } from './servicios/servicioexpo.service';

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
    private ser : ServicioexpoService
    ){
   
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      usuario:['',Validators.required],
      password:['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }
  guardar(){
    let data = this.aFormGroup.value;
    if (this.aFormGroup.invalid) { return ; }
    console.log(data);
    this.ser.validarrecaptcha(data.recaptcha).then((result)=>{
      console.log(result);
    })
    //https://www.google.com/recaptcha/api/siteverify?secret=6LfYI14aAAAAAFtNon_zACPSp83nqoKGWJk8IgLU&response=${data.recaptcha}
  }
  
}
