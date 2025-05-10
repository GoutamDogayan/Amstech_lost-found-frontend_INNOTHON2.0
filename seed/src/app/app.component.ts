// angular import
import { OnInit, Component, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';

// project import
import { BuyNowLinkService } from './@theme/services/buy-now-link.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  private productIdService = inject(BuyNowLinkService);

  // public props
  isSpinnerVisible = true;
  mainUrl: string;

  ngOnInit() {
    // Use ngOnInit instead of ngAfterViewInit
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => {
            this.isSpinnerVisible = true;
          });
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          setTimeout(() => {
            this.isSpinnerVisible = false;
          });
        }
      },
      () => {
        setTimeout(() => {
          this.isSpinnerVisible = false;
        });
      }
    );
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    this.productIdService.setBuyNowLink(params);
  }
}
