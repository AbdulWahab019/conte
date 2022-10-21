import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date = new Date();
  defaultDate = new NgbDate(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    this.date.getDate()
 );

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navToTreatmentPlan(){
    this.router.navigate(['dashboard/treatment-plan'])
  }
}
