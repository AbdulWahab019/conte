import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay } from '../../../utils/constants';
import { animate, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class HomeComponent implements OnInit {
  tpStartDate!: NgbDate;
  todaysDate!: NgbDate;
  defaultDate!: NgbDate;
  date = '';
  videoURL = '';
  areTasksCompleted = false;
  treatmentPlanStatus = '';
  treatmentPlanStartDate = new Date();

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.todaysDate = this.treatmentPlanService.getTodaysDate();
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
        const diff = moment(resp.data.tp_start_date).diff(moment(new Date()), 'days') + 1;

        if (diff < 0) {
          this.treatmentPlanStatus = 'started';
          const formattedTpDate = new Date(resp.data.tp_start_date);

          this.tpStartDate = new NgbDate(
            formattedTpDate.getFullYear(),
            formattedTpDate.getMonth() + 1,
            formattedTpDate.getDate() - 1
          );

          this.spinner.hide();
        } else {
          this.treatmentPlanStartDate = new Date(resp.data.tp_start_date);
          this.treatmentPlanStatus = 'pending';
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.error(err);
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
