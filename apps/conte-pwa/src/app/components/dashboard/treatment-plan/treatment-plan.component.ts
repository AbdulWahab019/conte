import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay } from '../../../utils/constants';
import { TaskDetailsComponent } from './task-details/task-details.component';

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

  getTasks() {
    this.spinner.show();

    this.treatmentPlanService
      .getDailyTasks(`${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-5`)
      .then((resp) => {
        this.dailyTasks = resp.data;
        if (this.dailyTasks.length) {
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

  updateTask(index: number) {
    const status = !this.dailyTasks[index].is_completed;
    this.dailyTasks[index].is_completed = 'loading';
    const task_id = this.dailyTasks[index].id;

    this.treatmentPlanService
      .updateTask(task_id, status)
      .then((resp) => {
        this.dailyTasks[index].is_completed = status;
        this.checkForCompletion();
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

  navBack() {
    this.router.navigate(['dashboard']);
  }
}
