import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { NAVBAR_COMPONENTS } from '../../shared/constants/navbar-config';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  url = '';
  navbarComponents = NAVBAR_COMPONENTS;

  constructor(private router: Router, private toast: ToastService) {}

  ngOnInit(): void {
    this.url = this.router.url;
  }

  navigate(url: string) {
    this.url = url;
    this.router.navigate([url]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
  }
}
