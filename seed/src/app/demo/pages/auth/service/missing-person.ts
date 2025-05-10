// missing-person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissingPersonService {

  private apiUrl = 'http://localhost:5000/api'; // Update if the Flask API is hosted elsewhere

  constructor(private http: HttpClient) {}

  generateDataset(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-dataset`, data);
  }

  trainModel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/train`);
  }

  detectUser(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/detect`, { name });
  }
}
