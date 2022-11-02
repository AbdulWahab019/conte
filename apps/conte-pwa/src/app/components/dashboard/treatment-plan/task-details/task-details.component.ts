import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { TreatmentPlanService } from 'apps/conte-pwa/src/app/services/treatment-plan.service';

@Component({
  selector: 'conte-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: any = {};
  @Input() dueDate = '';
  buttonState = 'static';

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    public activeModal: NgbActiveModal,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  completeDailyTask() {
    this.buttonState = 'loading';
    const status = !this.task.is_completed;
    const task_id = this.task.id;

    this.treatmentPlanService
      .updateTask(task_id, status)
      .then((resp) => {
        this.buttonState = 'static';
        const updatedTask = {
          status,
          task_id,
        };

        this.activeModal.close(updatedTask);
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
