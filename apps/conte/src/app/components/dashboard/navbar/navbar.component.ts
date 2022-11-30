import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NAVBAR_COMPONENTS } from '../../../Shared/constants/navbar-config';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class NavbarComponent implements OnInit {
  // activePath: string;
  // navbarComponents = NAVBAR_COMPONENTS;
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
  // mobile: boolean;
  // userRole: string;
  // @Input() showHideToggle: string;

  constructor(
    private router: Router,
    // private appService: AppService,
    private location: Location,
    // private authService: AuthService
  ) {
    this.currentUrl = this.router.url;
    this.previousUrl = null;
    // router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   this.previousUrl = this.currentUrl;
    //   this.currentUrl = event.urlAfterRedirects;
    //   if (this.previousUrl === '/dashboard') {
    //     this.navigateFromDash = true;
    //   } else this.navigateFromDash = false;
    // });
  }

  ngOnInit(): void {
    // this.init();
  }

  async init(): Promise<void> {
    // this.userRole = await this.authService.getUserRole();

    // switch (this.userRole) {
    //   case 'location_admin': {
    //     this.navbarComponents = this.navbarComponents.filter(
    //       (comp) => comp.title === 'User Management' || comp.title === 'Order Management'
    //     );
    //     break;
    //   }
    //   case 'location_user': {
    //     this.navbarComponents = this.navbarComponents.filter((comp) => comp.title === 'Order Management');
    //     break;
    //   }
    //   case 'practice_benefits': {
    //     this.navbarComponents = this.navbarComponents.filter((comp) => comp.title === 'Order Management');
    //     break;
    //   }
    //   case 'practice_scribe': {
    //     this.navbarComponents = this.navbarComponents.filter((comp) => comp.title === 'Video Dictation');
    //     break;
    //   }
    // }

    // this.setActiveClass();
    // this.appService.isNavbarVisible.subscribe((flag: boolean) => {
    //   this.isNavbarVisible = flag;
    // });

    // this.mobile = window.innerWidth <= 767;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.showHideToggle && changes.showHideToggle.currentValue) {
  //     this.hyperLinkPadding = '3px 15px';
  //     this.hyperLinkFontSize = '10px';
  //     this.hyperLinkLineHeight = '12px';
  //     // this.hyperLinkStyle = 'padding: 3px 15px, font-size: 10px, line-height: 12px;';
  //     this.hyperNavStyle =
  //       ' min-width: 100px; max-width: 100px;width: 100%; text-align: center;margin-left: 0 !important;';
  //     this.smallClass = 'display:block;font-size: 10px;width: 100%;';
  //   } else {
  //     this.hyperLinkPadding = '';
  //     this.hyperLinkFontSize = '';
  //     this.hyperLinkLineHeight = '';
  //     // this.hyperLinkStyle = '';
  //     this.hyperNavStyle = '';
  //     this.smallClass = '';
  //   }
  // }

  // setActiveClass(): void {
  //   if (this.userRole === 'location_admin' && this.router.url === '/dashboard') {
  //     this.activePath = '/dashboard/users';
  //   } else if (
  //     (this.userRole === 'location_user' || this.userRole === 'practice_benefits') &&
  //     this.router.url === '/dashboard'
  //   ) {
  //     this.activePath = '/dashboard/orders';
  //   } else if (this.userRole === 'practice_scribe' && this.router.url === '/dashboard') {
  //     this.activePath = '/dashboard/video-dictation';
  //   } else if (this.router.url === '/') {
  //     this.activePath = '/dashboard';
  //   } else {
  //     this.activePath = this.router.url;
  //   }
  // }

  // onResize(event) {
  //   const width = event.target.innerWidth;
  //   this.mobile = width <= 767;
  // }

  // get checkUrl(): boolean {
  //   return false;
  // }
}