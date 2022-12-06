import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NAVBAR_COMPONENTS } from '../../../Shared/constants/navbar-config';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class NavbarComponent {
  isNavbarVisible: boolean = true;
  navbarComponents = NAVBAR_COMPONENTS;
  hyperLinkStyle: any;
  hyperNavStyle: any;
  smallClass: any;
  hyperLinkPadding: any;
  hyperLinkFontSize: any;
  hyperLinkLineHeight: any;
  navigateFromDash: boolean = false;
  previousUrl: any;
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.previousUrl = null;
  }
}
