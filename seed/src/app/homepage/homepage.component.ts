import { Component } from "@angular/core";
import { FoundDataService } from "../demo/pages/auth/service/found-data-service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class HomepageComponent {

  constructor(private foundDataService: FoundDataService) {}

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
}
