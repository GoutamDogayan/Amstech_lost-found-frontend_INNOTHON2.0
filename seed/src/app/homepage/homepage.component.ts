import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
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

  constructor(private http: HttpClient, private apiService: MissingPersonService) {}

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

  detectFaces(): void {
    console.log('Detecting faces...');
  }
  
}
