import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private spinnerService: SpinnerService) {}

  ngOnInit(): void {}

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
