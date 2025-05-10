import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'})
export class UserService {

     private registerUrl = 'http://localhost:1024/lost-found-local/user/userRegister'; 
      private loginUrl = 'http://localhost:1024/lost-found-local/user/login';  
    
      constructor(private http: HttpClient,private router:Router) {}
    
      // Method to call the API and register a missing person
      userRegister(requestModel: any): Observable<any> {
       
        return this.http.post<any>(this.registerUrl, requestModel);
      }

      userlogin(userData: any): Observable<any> {
  return this.http.post<any>(this.loginUrl, userData, { observe: 'response' })
    .pipe(
      map(response => {
        const user = response.body;  
        
        if (user) {
          const token = response.headers.get('token');
          if (token) { 
            localStorage.setItem('currentUser', JSON.stringify(user)); 
          
          }
        }
        
        return user;
      })
    );
}


logout() {
  localStorage.clear();
  sessionStorage.clear();
  this.router.navigate(['/login']).then(() => {
    window.location.reload(); // instantly UI reset
  });
}
      
}