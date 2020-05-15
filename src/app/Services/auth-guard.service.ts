import { LoginService } from './login.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuardService implements CanActivate {

constructor(private route:Router,private logService:LoginService)
{}

canActivate():boolean
{
if(localStorage.getItem("token")===null || this.logService.email==undefined)
{
this.route.navigate([""]);
return false;
}
return true;
}
}