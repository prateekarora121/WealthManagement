import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stream } from 'xlsx/types';
import { FileToUpload } from '../Model_classes/FileToUpload';
import { map, retry } from 'rxjs/operators';
import { Order } from '../Model_classes/Order';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
public email:string;
public pwd:string;
public AuthToken:string="";
 baseURL:string="http://localhost:4791/api/";
  
  constructor(private httpClient:HttpClient) { }

getToken(name:string,pwd:string):Observable<any>
{
  this.email=name;
  this.pwd=pwd;
this.AuthToken="";
  let headers1 = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'});
    headers1.append("grant_type","password");
let options = { headers: headers1 };
    
  const body = "userName=" + encodeURIComponent(name) +"&password=" + encodeURIComponent(pwd) + "&grant_type=password" ;
//  return this.httpClient.post<any>("http://localhost:4791/token",params,{headers:headers,responseType:'json'});
return this.httpClient.post<any>('http://localhost:99/api/TOKEN',body,options);

  }


getAuthToken(name:string,pwd:string):String
  {
    
  this.AuthToken="";
    let headers1 = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'});
      headers1.append("grant_type","password");
  let options = { headers: headers1 };
      
    const body = "userName=" + encodeURIComponent(name) +"&password=" + encodeURIComponent(pwd) + "&grant_type=password" ;
  //  return this.httpClient.post<any>("http://localhost:4791/token",params,{headers:headers,responseType:'json'});
  let res= this.httpClient.post<any>('http://localhost:99/api/TOKEN',body,options);
  res.subscribe(data=>{
    this.AuthToken=data.access_token;
    localStorage.setItem("token",data.access_token);
   });
  return this.AuthToken;
    } 





getServiceDate():Observable<any[]>
{
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // ,'Authorization': 'Bearer ' +this.AuthToken 
  });
let options = { headers: headers };


return this.httpClient.get<any>("http://localhost:99/api/order",options).pipe(retry(2));
}



register(name:string,pwd:string):Observable<any>
{
  const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:4200'};
  let body = { "Email": name, "Password":pwd ,"ConfirmPassword":pwd }
  return this.httpClient.post<any>(this.baseURL+"Account/Register",body,{headers:headers});
}

public upload(theFile:FileToUpload,file:any):Observable<any> {
  const API_URL ='http://localhost:99/api/order/postfile';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
	return this.httpClient.post<any>(API_URL,theFile,httpOptions).pipe(retry(2));  
}
}
