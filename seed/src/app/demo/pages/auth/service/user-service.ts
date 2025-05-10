import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'})
export class UserService {

     private registerUrl = 'http://localhost:1024/lost-found-local/user/userRegister'; 
      private loginUrl = 'http://localhost:1024/lost-found-local/user/login';  
    
      constructor(private http: HttpClient) {}
    
      // Method to call the API and register a missing person
      userRegister(requestModel: any): Observable<any> {
       
        return this.http.post<any>(this.registerUrl, requestModel);
      }

      userlogin(requestModel: any): Observable<any> {
       
        return this.http.post<any>(this.loginUrl, requestModel);
      }
}