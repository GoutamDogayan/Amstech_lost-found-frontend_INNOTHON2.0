import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FoundDataService {
   
     private apiUrl = 'http://localhost:1024/lost-found-local/foundData/findByIdProof?idProof=';  
    
      constructor(private http: HttpClient) {}
    
      // Method to call the API and register a missing person
      missingPersonRegister(idProof: string): Observable<any> {
       
        return this.http.get<any>(this.apiUrl+idProof);
      }
  }