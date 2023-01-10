import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { UserService } from '../../../services/user.service';
import { TECHNICAL_DIFFICULTIES } from '../../../utils/constants';
@Component({
  selector: 'conte-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class GenericModalComponent implements OnInit {
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() logo = '';
  @Input() body = '';
  @Input() list = [];
  @Input() tableData = [];
  @Input() form = { title: '', status: '' };
  @Input() taskCreationForm = false;
  @Input() taskCreationFormWithTpDay = false;
  @Input() transferTasks = false;
  @Input() listActionText = '';
  @Input() listActionLogo = '';
  @Input() listAction!: (args: any) => void;
  @Input() listSecActionText = '';
  @Input() listSecActionLogo = '';
  @Input() listSecAction!: (args: any, secArgs: any) => void;
  @Input() videoURL = '';
  @Input() buttonText = '';
  @Input() buttonLoadingText = '';
  @Input() buttonAction!: (args: any) => void;
  @Input() closeButtonText = '';
  @Input() miscData: any;
  tpDay = '';
  taskType = '';
  taskSubType = '';
  innings = '';
  buttonState = 'static';
  secButtonState = 'static';
  title = '';
  taskIdsToUpdate = [];

  constructor(public activeModal: NgbActiveModal, private toast: ToastService, private userService: UserService) {}
  async buttonFunction() {
    if (this.buttonLoadingText) {
      this.buttonState = 'loading';
      await delay(1500);
    }

    this.activeModal.close();
  }

  ngOnInit(): void {
    if (this.transferTasks === true) {
      this.miscData.tasks.forEach((task: any) => {
        this.taskIdsToUpdate.push(task.id as never);
      });
    }
  }

  onSubmit() {
    let apiData = {
      title: this.form.title,
      is_completed: false,
      is_skipped: false,
    };
    if (this.form.status === 'skipped') {
      apiData = {
        title: this.form.title,
        is_completed: false,
        is_skipped: true,
      };
    } else if (this.form.status === 'completed') {
      apiData = {
        title: this.form.title,
        is_completed: true,
        is_skipped: true,
      };
    }
    const data = { data: apiData };
    this.userService
      .updateTask(this.miscData.userId, this.miscData.taskId, data)
      .then((resp: any) => {
        this.activeModal.close(this.form);
      })
      .catch((err) => {
        this.buttonState = 'static';
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }

  onTaskCheckChange(event: any, taskId: number) {
    console.log(event);
    console.log(taskId);
  }

  onTaskUpdate() {
    let taskTitle;
    switch (this.taskType) {
      case '1':
        taskTitle = 'plyo_throw';
        break;
      case '2':
        taskTitle = 'max_distance';
        break;
      case '3':
        taskTitle = 'post_max_distance_flat_ground';
        break;
      case '4':
        taskTitle = 'bullpen';
        break;
      case '5':
        taskTitle = 'live_simulated_game & innings';
        break;
    }
    const taskDetails = {
      taskTitle,
      taskType: this.taskType,
      taskSubType: this.taskSubType,
      innings: this.innings,
      tpDay: this.tpDay,
    };
    this.activeModal.close(taskDetails);
  }
  onTaskTransfer() {
    // const taskDetails = {
    //   taskTitle,
    //   taskType: this.taskType,
    //   taskSubType: this.taskSubType,
    //   innings: this.innings,
    //   tpDay: this.tpDay,
    // };
    // this.activeModal.close(taskDetails);
  }
}
