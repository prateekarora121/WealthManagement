import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule, RouterState, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor { 

/**
 *
 */
constructor(private logService:LoginService,private route:Router) {
    

}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
     {
      //  var a= localStorage.getItem("token");
      if(request !=null)

         if(request.url.search("TOKEN")==-1 && request !=null)
         {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token")) });
         }
        //  
        return next.handle(request);

    }


}