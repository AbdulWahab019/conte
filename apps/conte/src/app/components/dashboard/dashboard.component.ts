import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  url = '';
  constructor(private router: Router) {}
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    // this.spinner.show();
    // await delay(1000);
    // this.spinner.hide();
    // this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
  }
}
