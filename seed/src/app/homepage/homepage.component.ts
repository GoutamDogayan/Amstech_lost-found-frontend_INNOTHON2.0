import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import { FoundDataService } from "../demo/pages/auth/service/found-data-service";

import { functions } from "lodash";
import { MissingPersonService } from "../demo/pages/auth/service/missing-person";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
     imports: [ FormsModule,CommonModule],
})
export class HomepageComponent {
  name: string = '';  // ✅ Add this line
  userDetails: any = null;

  constructor(private http: HttpClient, private apiService: MissingPersonService,private foundDataService: FoundDataService) {}

  detectUser(name: string): void {
    this.apiService.detectUser(name).subscribe(
      (response) => {
        if (response.status === 'found') {
          this.userDetails = response.data;
        } else {
          console.log(`${name} not found.`);
          this.userDetails = null;
        }
      },
      (error) => {
        console.error('Error detecting user:', error);
        this.userDetails = null;
      }
    );
  }
   foundDataList: any[] = [];
  idProof: string = ''; 

  findMissingPerson() {
    this.foundDataService.missingPersonRegister(this.idProof).subscribe(
      (response) => {
        console.log('Found data:', response);
       this.foundDataList = [response.data]; 
      },
      (error) => {
        console.error('Error fetching found data:', error);
      }
    );
  }

  detectFaces(): void {
    console.log('Detecting faces...');
  }
  
}
