import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay } from '../../../utils/constants';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class HomeComponent implements OnInit {
  defaultDate!: NgbDate;
  date = '';
  videoURL = '';
  areTasksCompleted = false;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.defaultDate = this.treatmentPlanService.getTreatmentPlanDate();
    this.date = `${this.defaultDate.year}-${this.defaultDate.month}-${this.defaultDate.day}`;
    this.getTreatmentPlanDetail();
  }

  saveDate() {
    this.treatmentPlanService.setTreatmentPlanDate(this.defaultDate);
    this.date = `${this.defaultDate.year}-${this.defaultDate.month}-${this.defaultDate.day}`;
    this.getTreatmentPlanDetail();
  }

  getTreatmentPlanDetail() {
    this.spinner.show();

    this.treatmentPlanService
      .getTreatmentPlanDetails(this.date)
      .then((resp) => {
        this.videoURL = resp.data?.video_url;
        this.areTasksCompleted = resp.data?.are_tasks_completed;
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
        console.error(err);
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
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
