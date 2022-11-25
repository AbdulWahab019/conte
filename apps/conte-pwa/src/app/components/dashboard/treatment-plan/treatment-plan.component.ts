import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { GenericModalComponent } from '../../shared/modals/generic/generic-modal.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { submitFeedbackData, therapyTask } from '../../../models/treatmentplan';

@Component({
  selector: 'conte-treatment-plan',
  templateUrl: './treatment-plan.component.html',
  styleUrls: ['./treatment-plan.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
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
  dailyTasks: therapyTask[] = [] as therapyTask[];
  pendingTasks!: any;
  noTasks = false;
  areTasksCompleted = false;
  pendingTasksModal: any;
  taskFeedbackModal: any;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.treatmentPlanDate = this.treatmentPlanService.getTreatmentPlanDate();
    this.date = `${this.treatmentPlanDate.month} - ${this.treatmentPlanDate.day} - ${this.treatmentPlanDate.year}`;

    this.dailyTasks = await this.treatmentPlanService.getTherapyTasks();
    this.pendingTasks = await this.treatmentPlanService.getPendingTasks();
    if (this.pendingTasks) this.checkPendingTasks(this.pendingTasks);
    if (!this.dailyTasks.length) this.getTasks();
  }

  getTasks(date = `${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-${this.treatmentPlanDate.day}`) {
    this.spinner.show();

    this.treatmentPlanService
      .getDailyTasks(date)
      .then((resp) => {
        this.dailyTasks = resp.data.todays_tasks;
        if (resp.data.pending_tasks_dates?.length) {
          this.checkPendingTasks(resp.data.pending_tasks_dates);
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

  checkPendingTasks(pendingTasks: any) {
    this.pendingTasksModal = this.modalService.open(GenericModalComponent, { centered: true });
    this.pendingTasksModal.componentInstance.heading = 'Pending Tasks';
    this.pendingTasksModal.componentInstance.body = 'You have incompleted tasks on the following dates:';
    this.pendingTasksModal.componentInstance.list = pendingTasks;
    this.pendingTasksModal.componentInstance.listActionText = 'Navigate';
    this.pendingTasksModal.componentInstance.listActionLogo = `navigate`;
    this.pendingTasksModal.componentInstance.listAction = this.navToSpecificTask;
    this.pendingTasksModal.componentInstance.listSecActionText = 'Skip';
    this.pendingTasksModal.componentInstance.listSecActionLogo = `skip`;
    this.pendingTasksModal.componentInstance.listSecAction = this.skipSpecificTask;
    this.pendingTasksModal.componentInstance.buttonText = 'Acknowledge';
  }

  navToSpecificTask = (date: string): void => {
    this.date = date;
    const formattedDate = new Date(date);

    this.treatmentPlanDate = new NgbDate(
      formattedDate.getFullYear(),
      formattedDate.getMonth() + 1,
      formattedDate.getDate()
    );

    this.treatmentPlanService.setTreatmentPlanDate(this.treatmentPlanDate);

    this.modalService.dismissAll(this.pendingTasksModal);
    this.getTasks(date);
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

  updateTask(index: number) {
    const status = !this.dailyTasks[index].is_completed;
    this.dailyTasks[index].is_completed = 'loading';
    const task_id = this.dailyTasks[index].id;

    this.treatmentPlanService
      .updateTask(task_id, status)
      .then((resp) => {
        this.dailyTasks[index].is_completed = status;
        this.checkForCompletion();
        if (status && this.dailyTasks[index].task_type === 4) this.bullpenFeedback(task_id);
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
          if (result.status && this.dailyTasks[index].task_type === 4) {
            this.bullpenFeedback(this.dailyTasks[index].id);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  checkForCompletion() {
    const searchIndex = this.dailyTasks.findIndex((task: any) => task.is_completed === false);
    if (searchIndex > -1) this.areTasksCompleted = false;
    else this.areTasksCompleted = true;
  }

  bullpenFeedback(task_id: number) {
    this.taskFeedbackModal = this.modalService.open(GenericModalComponent, { centered: true });
    this.taskFeedbackModal.componentInstance.heading = 'Conte; Task Feedback';
    this.taskFeedbackModal.componentInstance.subHeading = 'Bullpen Throws';
    this.taskFeedbackModal.componentInstance.body = 'Please share your feedback regarding this task';
    this.taskFeedbackModal.componentInstance.buttonText = 'Submit';
    this.taskFeedbackModal.componentInstance.questionAnswers = [{ question: '', answer: '' }];
    this.taskFeedbackModal.componentInstance.QAbuttonText = 'Add question';
    this.taskFeedbackModal.componentInstance.QAbuttonLogo = 'add';
    this.taskFeedbackModal.componentInstance.buttonLoadingText = 'Submitting your feedback';
    this.taskFeedbackModal.componentInstance.buttonAction = this.submitFeedback;
    this.taskFeedbackModal.componentInstance.closeButtonText = 'Skip';
    this.taskFeedbackModal.componentInstance.miscData = task_id;
  }

  submitFeedback = (feedbackData: submitFeedbackData): void => {
    const data = [];
    for (const feedback of feedbackData.QA) {
      data.push({ question: feedback.question, feedback: feedback.answer, task_id: feedbackData.task_id, type: 2 });
    }

    const request = { data };
    this.treatmentPlanService
      .postTaskFeedback(request)
      .then((resp) => {
        this.toast.show('Feedback submitted successfully', { classname: 'bg-success text-light', icon: 'success' });
      })
      .catch((err) => {
        console.error(err);
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  };

  navBack() {
    this.router.navigate(['dashboard']);
  }
}
