import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  url = '';

  constructor(private router: Router) {}

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
}
