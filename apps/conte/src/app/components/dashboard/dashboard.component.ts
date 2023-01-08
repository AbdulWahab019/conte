import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastService } from '../../Shared/services/toast.service';
import { NAVBAR_COMPONENTS } from '../../Shared/constants/navbar-config';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  url = '';
  navbarComponents = NAVBAR_COMPONENTS;

  constructor(public router: Router, private toast: ToastService) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
  }
}
