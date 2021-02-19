import { Component, OnInit } from '@angular/core';
import { ServicioexpoService } from 'src/app/servicios/servicioexpo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private ser:ServicioexpoService) { }
  
  ngOnInit(): void {
    
  }
  valores:any=[];
  mostrarvalores(){
    
    this.ser.CheckToken();
    const validar= localStorage.getItem('Token');
    if(validar==null){
      alert('to token a vencido');
    }else{
      this.ser.ObtenerValores().then((result)=>{
        
          this.valores=result;
      })
    }

   
  }
 

}
