import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { error } from 'util';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor
{
/**
 *
 */
constructor(private route:Router,private login:LoginService) {

    
}
intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>
{
    var a= localStorage.getItem("token");
    if(request.url.search("TOKEN")==-1)
    {
   request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token")) });
console.log(localStorage.getItem("token"));    
}
    return next.handle(request)
    .pipe(
     
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.log(errorMessage);
          if (
            request.url.includes("signup") ||
            request.url.includes("login")
        ) {
            // We do another check to see if refresh token failed
            // In this case we want to logout user and to redirect it to login page

            if (request.url.includes("login")) {
                this.route.navigate(['logout']);
            }

            return Observable.throw(error);
        }
        if (error.status !== 401) {
          alert(error.status + "! Connection error please try after some time");
          
            this.route.navigate([""]);
            return next.handle(null);
        }
        else
        {
            let token=this.login.getToken(this.login.email,this.login.pwd);
            token.subscribe(data=>{
               localStorage.setItem("token",data.access_token);
              var nreq2=request.clone(
                   { 
                     headers:request.headers.set("Authorization","Bearer "+data.access_token)
                 });
               
            });
        
 return next.handle(request);

        }  
        })
        )

}
}