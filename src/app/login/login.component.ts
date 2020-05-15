import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private route:Router) { }
  email:string="";
  password:string="";
  Error:string;
auth:any;

  ngOnInit() {
  }
btnLogin()
{
  if(this.email.length>0 && this.password.length>0)
  {
 this.loginService.getToken(this.email,this.password).subscribe(data =>
   {
    localStorage.setItem("token",data.access_token);
    localStorage.setItem("expires_in",data.expires_in);
    console.log(data.access_token);
    this.route.navigate(['dashboard']);}
  ,
  err => {
    console.log(err);
        console.log('Error: ' + err.error.error_description);
        
this.Error=err.error.error_description;
      });
  
  
}
 else
  this.Error="Some Error Occured"
}
}
