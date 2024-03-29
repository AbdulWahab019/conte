import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { animate, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';
import { GenericModalComponent } from '../../shared/modals/generic/generic-modal.component';
import { dailyData } from '../../../models/treatmentplan';
import { DashboardService } from '../../../services/dashboard.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay, TECHNICAL_DIFFICULTIES } from '../../../utils/constants';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class HomeComponent implements OnInit {
  date = '';
  videoURL = '';
  videoMuted = true;
  soundButton = false;
  apiLoaded = false;
  calendarApiLoaded = false;
  areTasksCompleted = false;
  treatmentPlanStatus = '';
  tpDaysRemaining = 0;
  treatmentPlanStartDate = new Date();
  noTasksAvailable = false;
  pendingTasks: any;
  pendingTasksModal: any;
  taskFeedbackModal: any;
  swipeCoord!: [number, number];
  swipeTime!: number;
  monthlyData: dailyData[] = [];
  currentMonth = moment().format('MMMM');
  currentYear = moment().format('YYYY');
  @ViewChild('selectedDay') private selectedDay: ElementRef = {} as ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.date = this.treatmentPlanService.getTreatmentPlanDate();
    this.getTreatmentPlanDetail();
  }

  getTreatmentPlanDetail() {
    this.apiLoaded = false;
    this.videoMuted = true;
    this.soundButton = false;

    this.dashboardService
      .getTreatmentPlanDetails(this.date)
      .then((resp) => {
        this.videoURL = resp.data?.video_url;
        this.areTasksCompleted = resp.data?.are_tasks_completed;
        this.tpDaysRemaining = moment(resp.data.tp_start_date).diff(moment(this.date), 'days');

        if (this.tpDaysRemaining <= 0) {
          this.treatmentPlanStatus = 'started';

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

              this.getCalendarData();
              this.apiLoaded = true;
            })
            .catch((err) => {
              console.error(err);
              this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
                classname: 'bg-danger text-light',
                icon: 'error',
              });
            });
        } else {
          this.apiLoaded = true;
          this.getCalendarData();

          this.treatmentPlanStartDate = new Date(resp.data.tp_start_date);
          this.treatmentPlanStatus = 'pending';
        }
      })
      .catch((err) => {
        console.error(err);
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }

  getCalendarData() {
    if (this.currentMonth !== moment(this.date).format('MMMM') || !this.calendarApiLoaded) {
      this.calendarApiLoaded = false;
      this.currentMonth = moment(this.date).format('MMMM');
      this.currentYear = moment(this.date).format('YYYY');

      this.dashboardService
        .getCalendarDetails(this.date)
        .then((resp) => {
          this.monthlyData = resp.data;
          this.monthlyData.forEach((date) => {
            date.selected = false;
          });

          this.monthlyData[this.monthlyData.findIndex((day: dailyData) => day.date === this.date)].selected = true;
          this.calendarApiLoaded = true;

          this.scrollToSelectedDay();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  async scrollToSelectedDay() {
    await delay(1000);
    const element = document.getElementById('selected-day');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  }

  renderSoundButton() {
    this.soundButton = true;
  }

  checkForMute() {
    const video = <HTMLVideoElement>document.getElementById('video');
    if (video) {
      this.videoMuted = video.muted;
      if (video.muted) this.soundButton = true;
      else this.soundButton = false;
    }
  }

  saveDate(date: string, index: number) {
    this.treatmentPlanService.setTreatmentPlanDate(date);
    this.date = date;
    this.monthlyData.forEach((day: dailyData) => {
      day.selected = false;
    });

    this.monthlyData[index].selected = true;
    this.scrollToSelectedDay();

    this.getTreatmentPlanDetail();
  }

  navByMonth(direction: string) {
    if (direction === 'next')
      this.treatmentPlanService.setTreatmentPlanDate(moment(this.date).add(1, 'month').format('YYYY-MM-DD'));
    else this.treatmentPlanService.setTreatmentPlanDate(moment(this.date).subtract(1, 'month').format('YYYY-MM-DD'));

    this.date = this.treatmentPlanService.getTreatmentPlanDate();
    this.calendarApiLoaded = false;
    this.getTreatmentPlanDetail();
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (
        duration < 1000 && //
        Math.abs(direction[0]) > 30 && // Long enough
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        const swipe = direction[0] < 0 ? 'right' : 'left';
        this.navOnSwipe(swipe);
      }
    }
  }

  navOnSwipe(swipe: string) {
    if (swipe === 'right') {
      this.date = moment(this.date).add(1, 'd').format('YYYY-MM-DD');
    } else {
      this.date = moment(this.date).subtract(1, 'd').format('YYYY-MM-DD');
    }

    this.treatmentPlanService.setTreatmentPlanDate(this.date);

    if (this.currentMonth === moment(this.date).format('MMMM')) {
      let index = 0;
      this.monthlyData.forEach((day: dailyData, i) => {
        if (day.selected) index = i;
        day.selected = false;
      });

      if (swipe === 'right') this.monthlyData[index + 1].selected = true;
      else this.monthlyData[index - 1].selected = true;
    } else this.calendarApiLoaded = false;

    this.scrollToSelectedDay();
    this.getTreatmentPlanDetail();
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

    this.treatmentPlanService.setTreatmentPlanDate(date);

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
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  };

  navToTreatmentPlan() {
    this.router.navigate(['dashboard/treatment-plan']);
  }
}
