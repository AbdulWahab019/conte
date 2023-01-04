import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { TreatmentPlanService } from 'apps/conte-pwa/src/app/services/treatment-plan.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { TECHNICAL_DIFFICULTIES } from 'apps/conte-pwa/src/app/utils/constants';

@Component({
  selector: 'conte-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: any = {};
  @Input() dueDate = '';
  buttonState = 'static';
  sendButtonState = 'static';
  comment = '';
  videoURL = '';

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    public activeModal: NgbActiveModal,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    switch (this.task.task_type) {
      case 1: {
        this.videoURL = 'https://conteassets.blob.core.windows.net/tasktutorial/1_Plyo_Throw_Tutorial.mp4';
        break;
      }
      case 2: {
        this.videoURL = 'https://conteassets.blob.core.windows.net/tasktutorial/2_Max_Distance_Throw_Tutorial.mp4';
        break;
      }
      case 3: {
        this.videoURL =
          'https://conteassets.blob.core.windows.net/tasktutorial/3_Post_Max_Distance_Flat_Ground_Tutorial.mp4';
        break;
      }
      case 4: {
        this.videoURL = 'https://conteassets.blob.core.windows.net/tasktutorial/4_Bullpen_Tutorial.mp4';
        break;
      }
      case 5: {
        this.videoURL = 'https://conteassets.blob.core.windows.net/tasktutorial/5_Simulated_Game_Tutorial.mp4';
        break;
      }
      default: {
        break;
      }
    }
  }

  completeDailyTask() {
    this.buttonState = 'loading';
    const status = !this.task.is_completed;
    const task_id = this.task.id;
    const data = { comment: this.comment };

    this.treatmentPlanService
      .updateTask(task_id, status, data)
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
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }
}
