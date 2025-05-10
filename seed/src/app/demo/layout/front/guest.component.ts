// angular import
import { Component, effect, inject } from '@angular/core';

// service
import { BuyNowLinkService } from 'src/app/@theme/services/buy-now-link.service';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';

// data
import { techData } from '../../data/tech-data';

// type
import { TechSection } from 'src/app/@theme/types/tech-data-type';
import { DARK } from 'src/app/@theme/const';

@Component({
  selector: 'app-guest',
  standalone: false,
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {
  buyNowLinkService = inject(BuyNowLinkService);
  authenticationService = inject(AuthenticationService);
  private themeService = inject(ThemeLayoutService);

  // public props
  navDataShow!: boolean;
  dropDownIcon: string = 'custom-arrowDown2';
  drpTechBlock: TechSection[] = techData;
  isDarkMode: boolean;

  // constructor
  constructor() {
    effect(() => {
      this.themeMode(this.themeService.isDarkMode());
    });
  }

  // private method
  private themeMode(isDark: string) {
    this.isDarkMode = isDark === DARK ? true : false;
  }

  // public methods
  open(item: TechSection) {
    window.open(window.location.href.replace(window.location.search, '') + item.url + this.buyNowLinkService.queryString, '_blank');
  }
  openDashboard() {
    window.open(
      window.location.href.replace(window.location.href, '') + 'dashboard/default' + this.buyNowLinkService.queryString,
      '_blank'
    );
  }
  toggleIcon(): void {
    this.dropDownIcon = 'custom-arrowUp2';
  }
  resetIcon(): void {
    this.dropDownIcon = 'custom-arrowDown2';
  }
}
