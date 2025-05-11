// angular import
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../demo/shared/shared.module';


@Component({
  selector: 'app-footer-user',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent  {
  dropDownIcon: string = 'custom-arrowDown2';
 

 
  footerSection = [
    {
    title: 'SkillMate',
    footerLink: [
      {
        title: 'Home',
        link: '/talenthands/homepage'
      },
      {
        title: 'Worker',
        link: '/talenthands/worker/workerprofile'
      },
      {
        title: 'About',
        link: '/talenthands/about'
      },
      {
        title: 'Worker List',
        link: '/talenthands/workerlist'
      },
      {
        title: 'Contact',
        link: '/talenthands/contact'
      }
    ]
  },
    {
      title: 'Useful Resources',
      footerLink: [
        {
          title: 'Support & Help',
          link: 'tel:+918103490486'
        },
        
      ]
    }
  ];

  socialLinks = [
    { url: 'https://www.linkedin.com/in/goutam-dogayan-113a42255', icon: 'ti ti-brand-linkedin' },
    { url: 'https://www.linkedin.com/in/goutam-dogayan-113a42255', icon: 'ti ti-brand-linkedin' },
    { url: 'https://www.linkedin.com/in/goutam-dogayan-113a42255', icon: 'ti ti-brand-linkedin' },
    { url: 'https://www.linkedin.com/in/goutam-dogayan-113a42255', icon: 'ti ti-brand-linkedin' },
    { url: 'https://www.linkedin.com/in/goutam-dogayan-113a42255', icon: 'ti ti-brand-linkedin' },
    { url: 'https://github.com/GoutamDogayan', icon: 'ti ti-brand-github' },
   
  ];

  toggleIcon(): void {
    this.dropDownIcon = 'custom-arrowUp2';
  }

  resetIcon(): void {
    this.dropDownIcon = 'custom-arrowDown2';
  }
}
