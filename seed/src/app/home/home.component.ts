import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserService } from "../demo/pages/auth/service/user-service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [RouterModule],
})

export class HomeComponent {
    constructor(private userService: UserService) {
        console.log("Home component initialized");
    }

     logout() {
    console.log("Logout clicked");
    this.userService.logout();
  }
}