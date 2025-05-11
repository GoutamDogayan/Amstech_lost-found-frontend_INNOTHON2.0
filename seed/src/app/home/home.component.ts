import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserService } from "../demo/pages/auth/service/user-service";
import { CommonModule } from "@angular/common";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [RouterModule,CommonModule],
})

export class HomeComponent {
    constructor(private userService: UserService) {
        console.log("Home component initialized");
    }

   cards = [
    {
      title: 'Register with Live Camera',
      description: 'Face Detection Only" feature enables a system to access the users webcam and detect a human face in real-time before proceeding with registration or verification  the application streams live video from the users camera to an HTML video element.'
    },
    {
      title: 'Face Detection and Recognition',
      description: 'Face detection and recognition are two crucial concepts in computer vision, used to identify and verify individuals based on their facial features. These technologies are widely applied in various domains, from security systems to social media platforms.'
    },
    {
      title: 'Database Storage And Matching',
      description: 'In facial recognition systems, database storage and matching are crucial components that ensure the system can efficiently store and compare facial data. Let s dive into how these components work and their importance in the overall face detection and recognition process.'
    }
  ];
     logout() {
    console.log("Logout clicked");
    this.userService.logout();
  }
}