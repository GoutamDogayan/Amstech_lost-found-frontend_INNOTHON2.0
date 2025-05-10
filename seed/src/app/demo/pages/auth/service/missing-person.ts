// missing-person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissingPersonService {

  private apiUrl = 'http://localhost:1024/lost-found-local/missingPerson/missingPersonRegister';  // Your backend API endpoint

  constructor(private http: HttpClient) {}

  // Method to call the API and register a missing person
  missingPersonRegister(requestModel: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiUrl, requestModel, { headers });
  }
}
