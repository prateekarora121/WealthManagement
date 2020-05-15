import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private loginService:LoginService) { }
SignUpForm:FormGroup;

  ngOnInit() {
this.SignUpForm=new FormGroup({
 Email:new FormControl('',Validators.required),
 Password:new FormControl('',Validators.required),
 ConfirmPassword:new FormControl('',Validators.required)
},{


});
  }
onSubmit()
{

  
  let email=this.SignUpForm.value.Email;
  let password=this.SignUpForm.value.Password;

this.loginService.register(email,password).subscribe((data)=>{

  console.log(data);
});

}

  

}
