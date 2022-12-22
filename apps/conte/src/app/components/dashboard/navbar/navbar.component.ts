import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NAVBAR_COMPONENTS } from '../../../shared/constants/navbar-config';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class NavbarComponent {
  navbarComponents = NAVBAR_COMPONENTS;
  hyperLinkFontSize: any;
  navigateFromDash: boolean = false;
  previousUrl: any;
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.previousUrl = null;
  }
}
