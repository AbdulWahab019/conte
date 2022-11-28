import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { animate, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';
import { GenericModalComponent } from '../../shared/modals/generic/generic-modal.component';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class HomeComponent implements OnInit {
  tpStartDate!: NgbDate;
  todaysDate!: NgbDate;
  treatmentPlanDate!: NgbDate;
  date = '';
  videoURL = '';
  apiLoaded = false;
  areTasksCompleted = false;
  treatmentPlanStatus = '';
  treatmentPlanStartDate = new Date();
  noTasksAvailable = false;
  pendingTasks: any;
  pendingTasksModal: any;
  taskFeedbackModal: any;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.todaysDate = this.treatmentPlanService.getTodaysDate();
    this.treatmentPlanDate = this.treatmentPlanService.getTreatmentPlanDate();
    this.date = `${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-${this.treatmentPlanDate.day}`;
    this.getTreatmentPlanDetail();
  }

  saveDate() {
    this.treatmentPlanService.setTreatmentPlanDate(this.treatmentPlanDate);
    this.date = `${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-${this.treatmentPlanDate.day}`;
    this.getTreatmentPlanDetail();
  }

  getTreatmentPlanDetail() {
    this.spinner.show();
    this.apiLoaded = false;

    this.treatmentPlanService
      .getTreatmentPlanDetails(this.date)
      .then((resp) => {
        this.videoURL = resp.data?.video_url;
        this.areTasksCompleted = resp.data?.are_tasks_completed;
        const tpDiff = moment(resp.data.tp_start_date).diff(moment(new Date()), 'days');

        if (tpDiff <= 0) {
          this.treatmentPlanStatus = 'started';
          const formattedTpDate = new Date(resp.data.tp_start_date);

          this.tpStartDate = new NgbDate(
            formattedTpDate.getFullYear(),
            formattedTpDate.getMonth() + 1,
            formattedTpDate.getDate()
          );

          this.treatmentPlanService
            .getDailyTasks(this.date)
            .then((resp) => {
              if (resp.data.pending_tasks_dates?.length) {
                this.pendingTasks = resp.data.pending_tasks_dates;
                this.treatmentPlanService.setPendingTasks(resp.data.pending_tasks_dates);
              } else {
                this.pendingTasks = null;
                this.treatmentPlanService.setPendingTasks(null);
              }

              if (resp.data.todays_tasks?.length) {
                this.treatmentPlanService.setTherapyTasks(resp.data.todays_tasks);
                this.noTasksAvailable = false;
              } else {
                this.noTasksAvailable = true;
              }

              this.apiLoaded = true;
              this.spinner.hide();
            })
            .catch((err) => {
              this.spinner.hide();
              console.error(err);
              this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
            });
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

  checkPendingTasks() {
    this.pendingTasksModal = this.modalService.open(GenericModalComponent, { centered: true });
    this.pendingTasksModal.componentInstance.heading = 'Pending Tasks';
    this.pendingTasksModal.componentInstance.body = 'You have incompleted tasks on the following dates:';
    this.pendingTasksModal.componentInstance.list = this.pendingTasks;
    this.pendingTasksModal.componentInstance.listActionText = 'Navigate';
    this.pendingTasksModal.componentInstance.listActionLogo = `navigate`;
    this.pendingTasksModal.componentInstance.listAction = this.navToSpecificDay;
    this.pendingTasksModal.componentInstance.listSecActionText = 'Skip';
    this.pendingTasksModal.componentInstance.listSecActionLogo = `skip`;
    this.pendingTasksModal.componentInstance.listSecAction = this.skipSpecificTask;
    this.pendingTasksModal.componentInstance.buttonText = 'Acknowledge';
  }

  navToSpecificDay = (date: string): void => {
    this.date = date;
    const formattedDate = new Date(date);

    this.treatmentPlanDate = new NgbDate(
      formattedDate.getFullYear(),
      formattedDate.getMonth() + 1,
      formattedDate.getDate()
    );

    this.treatmentPlanService.setTreatmentPlanDate(this.treatmentPlanDate);

    this.modalService.dismissAll(this.pendingTasksModal);
    this.getTreatmentPlanDetail();
  };

  skipSpecificTask = (date: string, pending_tasks: any): void => {
    this.spinner.show();

    this.treatmentPlanService
      .skipTask(date)
      .then((resp) => {
        const pending_tasks_dates = pending_tasks.filter((task: string) => task !== date);
        this.pendingTasksModal.componentInstance.list = pending_tasks_dates;
        this.spinner.hide();
        this.toast.show('Task Updated Successfully', { classname: 'bg-success text-light', icon: 'success' });
      })
      .catch((err) => {
        console.error(err);
        this.spinner.hide();
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  };

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
