import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import { FoundDataService } from "../demo/pages/auth/service/found-data-service";

import { functions } from "lodash";
import { MissingPersonService } from "../demo/pages/auth/service/missing-person";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";
import { UserService } from "../demo/pages/auth/service/user-service";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
     imports: [ FormsModule,CommonModule,RouterModule],
})
export class HomepageComponent {
  name: string = '';  // ✅ Add this line
  userDetails: any = null;

  constructor(private http: HttpClient, private apiService: MissingPersonService,private foundDataService: FoundDataService,private userService:UserService) {}

  detectUser(name: string): void {
    this.apiService.detectUser(name).subscribe(
      (response) => {
        if (response.status === 'found') {
          this.userDetails = response.data;

          Swal.fire({
            icon: 'success',
            title: 'User Found!',
            text: `${name} has been detected and saved successfully.`,
            confirmButtonText: 'OK'
          });
        } else {
          this.userDetails = null;
          Swal.fire({
            icon: 'info',
            title: 'No Match Found',
            text: `${name} not found in the system.`,
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        this.userDetails = null;
        Swal.fire({
          icon: 'error',
          title: 'Detection Error',
          text: 'Something went wrong while detecting the user.',
          confirmButtonText: 'Close'
        });
        console.error('Error detecting user:', error);
      }
    );
  }
   foundDataList: any[] = [];
  idProof: string = ''; 

  findMissingPerson() {
    this.foundDataService.missingPersonRegister(this.idProof).subscribe(
      (response) => {
        console.log('Found data:', response);
       this.foundDataList = response.data; 
      },
      (error) => {
        console.error('Error fetching found data:', error);
      }
    );
  }

  logout() {
    console.log("Logout clicked");
    this.userService.logout();
  }
  detectFaces(): void {
    console.log('Detecting faces...');
  }
  
}
