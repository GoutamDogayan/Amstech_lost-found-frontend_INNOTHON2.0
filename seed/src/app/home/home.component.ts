import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [RouterModule],
})

export class HomeComponent {
    constructor() {
        console.log("Home component initialized");
    }
}