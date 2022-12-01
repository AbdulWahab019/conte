import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { delay } from '../../utils/constants';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  url = '';

  constructor(private router: Router, private spinner: SpinnerService, private toast: ToastService) {}

  ngOnInit(): void {
    this.url = this.router.url;
  }

  navToHome() {
    this.url = '/dashboard';
    this.router.navigate(['dashboard']);
  }

  navToContact() {
    this.url = '/dashboard/contact';
    this.router.navigate(['dashboard/contact']);
  }

  navToProfile() {
    this.url = '/dashboard/profile';
    this.router.navigate(['dashboard/profile']);
  }

  async logout() {
    localStorage.clear();
    this.spinner.show();
    await delay(1000);
    this.spinner.hide();
    this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
    this.router.navigate(['authentication']);
  }
}
