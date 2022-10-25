import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { delay } from '../../utils/constants';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date = new Date();
  defaultDate = new NgbDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());

  constructor(private router: Router, private spinnerService: SpinnerService, private toastService: ToastService) {}

  ngOnInit(): void {}

  async logout() {
    localStorage.clear();
    this.spinnerService.show();
    await delay(1000);
    this.spinnerService.hide();
    this.toastService.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
    this.router.navigate(['authentication']);
  }

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
