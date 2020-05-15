import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanLoadGuard implements CanLoad {
  /**
   *
   */
  constructor(private router:Router) {
    
    
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {

      let url: string = route.path;
      console.log('Url:'+ url);
      if (url!="admin") {
        alert('You are not authorised to visit this page');
       // url=this.route.url.toString();
        //this.router.navigate([url]);
        return false;
      }  
      return true; 
    
  }
}
