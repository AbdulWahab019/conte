import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay } from '../../../utils/constants';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  defaultDate!: NgbDate;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.defaultDate = this.treatmentPlanService.getTreatmentPlanDate();
  }

  saveDate() {
    this.treatmentPlanService.setTreatmentPlanDate(this.defaultDate);
    delay(2000);
  }

  async logout() {
    localStorage.clear();
    this.spinner.show();
    await delay(1000);
    this.spinner.hide();
    this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
    this.router.navigate(['authentication']);
  }

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
