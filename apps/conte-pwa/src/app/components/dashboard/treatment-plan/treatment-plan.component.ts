import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { GenericModalComponent } from '../../shared/modals/generic/generic-modal.component';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';

@Component({
  selector: 'conte-treatment-plan',
  templateUrl: './treatment-plan.component.html',
  styleUrls: ['./treatment-plan.component.scss'],
})
export class TreatmentPlanComponent implements OnInit {
  todaysDate = new Date();
  date = '';
  renderTaskDetails = false;
  treatmentPlanDate = new NgbDate(
    this.todaysDate.getFullYear(),
    this.todaysDate.getMonth() + 1,
    this.todaysDate.getDate()
  );
  buttonState = 'loading';
  dailyTasks!: any;
  noTasks = false;
  pendingTasksModal: any;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private spinner: SpinnerService,
    private modalService: NgbModal,
    private toast: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.treatmentPlanDate = this.treatmentPlanService.getTreatmentPlanDate();
    this.date = `${this.treatmentPlanDate.month} - ${this.treatmentPlanDate.day} - ${this.treatmentPlanDate.year}`;

    this.getTasks();
  }

  getTasks(date = `${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-${this.treatmentPlanDate.day}`) {
    this.spinner.show();

    this.treatmentPlanService
      .getDailyTasks(date)
      .then((resp) => {
        this.dailyTasks = resp.data.todays_tasks;
        if (resp.data.pending_tasks_dates?.length) {
          this.pendingTasksModal = this.modalService.open(GenericModalComponent, { centered: true });
          this.pendingTasksModal.componentInstance.heading = 'Pending Tasks';
          this.pendingTasksModal.componentInstance.body = 'You have incompleted tasks on the following dates:';
          this.pendingTasksModal.componentInstance.list = resp.data.pending_tasks_dates;
          this.pendingTasksModal.componentInstance.listActionText = 'Navigate';
          this.pendingTasksModal.componentInstance.listActionLogo = `navigate`;
          this.pendingTasksModal.componentInstance.listAction = this.navToSpecificTask;
          this.pendingTasksModal.componentInstance.buttonText = 'Acknowledge';
        }

        if (this.dailyTasks?.length) {
          this.noTasks = false;
          this.checkForCompletion();
        } else {
          this.noTasks = true;
        }
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
        console.error(err);
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  navToSpecificTask = (date: string): void => {
    this.date = date;
    this.modalService.dismissAll(this.pendingTasksModal);
    this.getTasks(date);
  };

  updateTask(index: number) {
    const status = !this.dailyTasks[index].is_completed;
    this.dailyTasks[index].is_completed = 'loading';
    const task_id = this.dailyTasks[index].id;

    this.treatmentPlanService
      .updateTask(task_id, status)
      .then((resp) => {
        this.dailyTasks[index].is_completed = status;
        this.checkForCompletion();
        if (status) this.bullpenFeedback();
      })
      .catch((err) => {
        console.error(err);
        this.getTasks();
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  taskDetails(task = {}) {
    const taskDetailRef = this.modalService.open(TaskDetailsComponent, { centered: true, size: 'xl' });
    taskDetailRef.componentInstance.task = task;
    taskDetailRef.componentInstance.dueDate = this.date;
    taskDetailRef.result
      .then((result) => {
        if (result) {
          const index = this.dailyTasks.findIndex((task: any) => task.id === result.task_id);
          this.dailyTasks[index].is_completed = result.status;
          this.checkForCompletion();
          if (result.status) {
            this.bullpenFeedback();
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  checkForCompletion() {
    const searchIndex = this.dailyTasks.findIndex((task: any) => task.is_completed === false);
    if (searchIndex > -1) this.buttonState = 'loading';
    else this.buttonState = 'static';
  }

  bullpenFeedback() {
    this.pendingTasksModal = this.modalService.open(GenericModalComponent, { centered: true });
    this.pendingTasksModal.componentInstance.heading = 'Conte; Task Feedback';
    this.pendingTasksModal.componentInstance.subHeading = 'Bullpen Throws';
    this.pendingTasksModal.componentInstance.body = 'Please share your feedback regarding this task';
    this.pendingTasksModal.componentInstance.buttonText = 'Submit';
    this.pendingTasksModal.componentInstance.questionAnswers = [{ question: '', answer: '' }];
    this.pendingTasksModal.componentInstance.QAbuttonText = 'Add question';
    this.pendingTasksModal.componentInstance.QAbuttonLogo = 'add';
    this.pendingTasksModal.componentInstance.buttonLoadingText = 'Submitting your feedback';
    this.pendingTasksModal.componentInstance.buttonAction = this.submitFeedback;
  }

  submitFeedback(taskFeedback: any) {
    console.log(taskFeedback)
  }

  navBack() {
    this.router.navigate(['dashboard']);
  }
}
