import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../../services/spinner.service';
import { TreatmentPlanService } from '../../../services/treatment-plan.service';
import { delay } from '../../../utils/constants';

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
  buttonState = 'static';
  dailyTasks!: any;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.treatmentPlanDate = this.treatmentPlanService.getTreatmentPlanDate();
    this.date = `${this.treatmentPlanDate.month} - ${this.treatmentPlanDate.day} - ${this.treatmentPlanDate.year}`;

    this.getTasks();
  }

  getTasks() {
    this.spinner.show();

    this.treatmentPlanService
      .getDailyTasks(`${this.treatmentPlanDate.year}-${this.treatmentPlanDate.month}-${this.treatmentPlanDate.day}`)
      .then((resp) => {
        this.dailyTasks = resp.data;
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
        console.error(err);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }

  taskDetails() {
    this.renderTaskDetails = !this.renderTaskDetails;
  }

  navBack() {
    this.router.navigate(['dashboard']);
  }

  async completeTherapy() {
    this.buttonState = 'loading';
    await delay(1600);
    this.buttonState = 'static';
  }
}
