import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { UserService } from '../../../services/user.service';
import { TECHNICAL_DIFFICULTIES } from '../../../utils/constants';
import { taskToTransfer } from '../../../models/TreatmentPlan';

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
  @Input() postponeDays = false;
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
  descriptionAdded = false;
  subType = false;
  plyoThrowDescription = { times: '' };
  maxDistanceDescription = { distance: '', num_throws: '', max_velocity: '' };
  flateGroundDescription = {
    forkBallNum: '',
    forkBallVelocity: '',
    changeupNum: '',
    changeupVelocity: '',
    allNum: '',
    allVelocity: '',
  };
  bullPenDescription = {
    forkBallNum: '',
    forkBallVelocity: '',
    changeupNum: '',
    changeupVelocity: '',
    allNum: '',
    allVelocity: '',
  };
  liveSimulatedDescription = {
    innings: '',
  };
  taskType = '';
  taskSubType = '';
  innings = '';
  buttonState = 'static';
  secButtonState = 'static';
  title = '';
  dayToTransfer = 0;
  taskIdsToUpdate: Number[] = [];
  dayToPostpone = 0;
  daysForPostpone = 0;

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
      this.miscData.tasks.forEach((task: taskToTransfer) => {
        this.taskIdsToUpdate.push(task.id);
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

  onTaskCheckChange(taskId: number) {
    if (this.taskIdsToUpdate.includes(taskId)) {
      const index = this.taskIdsToUpdate.indexOf(taskId);
      this.taskIdsToUpdate.splice(index, 1);
    } else {
      this.taskIdsToUpdate.push(taskId);
    }
  }
  onchangeTask(e: any) {
    if (this.taskType !== '') {
      this.descriptionAdded = false;
      this.subType = false;
    }
  }
  onchangeSubType(val: any) {
    if (this.taskSubType) {
      this.subType = true;
    } else {
      this.subType = false;
    }
  }
  onchangeDescription(inputVal: any) {
    switch (this.taskType) {
      case '1':
        this.plyoThrowDescription.times !== '' ? (this.descriptionAdded = true) : (this.descriptionAdded = false);
        this.subType = true;
        break;
      case '2':
        this.maxDistanceDescription.distance !== '' &&
        this.maxDistanceDescription.num_throws !== '' &&
        this.maxDistanceDescription.max_velocity !== ''
          ? (this.descriptionAdded = true)
          : (this.descriptionAdded = false);
        this.subType = true;
        break;
      case '3':
        (this.flateGroundDescription.forkBallNum !== '' && this.flateGroundDescription.forkBallVelocity !== '') ||
        (this.flateGroundDescription.changeupNum !== '' && this.flateGroundDescription.changeupVelocity !== '') ||
        (this.flateGroundDescription.allNum !== '' && this.flateGroundDescription.allVelocity !== '')
          ? (this.descriptionAdded = true)
          : (this.descriptionAdded = false);
        break;
      case '4':
        (this.bullPenDescription.forkBallNum !== '' && this.bullPenDescription.forkBallVelocity !== '') ||
        (this.bullPenDescription.changeupNum !== '' && this.bullPenDescription.changeupVelocity !== '') ||
        (this.bullPenDescription.allNum !== '' && this.bullPenDescription.allVelocity !== '')
          ? (this.descriptionAdded = true)
          : (this.descriptionAdded = false);
        break;
      case '5':
        this.liveSimulatedDescription.innings !== '' ? (this.descriptionAdded = true) : (this.descriptionAdded = false);
        this.subType = true;
        break;
      default:
        break;
    }
  }
  onTaskUpdate() {
    let taskTitle;
    let taskDescription;
    switch (this.taskType) {
      case '1':
        taskTitle = 'plyo_throw';
        taskDescription = `Throw Plyo ball ${this.plyoThrowDescription.times} times.`;
        break;
      case '2':
        taskTitle = 'max_distance';
        taskDescription = `Catch play build up to max distance of ${this.maxDistanceDescription.distance}  feet. ${this.maxDistanceDescription.num_throws} throws at this distance with gradual buildup to max velocity of ${this.maxDistanceDescription.max_velocity} mph.`;
        break;
      case '3':
        taskTitle = 'post_max_distance_flat_ground';
        this.taskSubType === 'FB'
          ? (taskDescription = `Throw ALL Forkball pitches in today’s ${this.flateGroundDescription.forkBallNum} pitch flat ground with a max velocity of ${this.flateGroundDescription.forkBallVelocity} mph.`)
          : null;
        this.taskSubType === 'CH'
          ? (taskDescription = `Throw ALL changeup pitches in today’s ${this.flateGroundDescription.changeupNum} pitch flat ground with a max velocity of ${this.flateGroundDescription.changeupVelocity} mph.`)
          : null;
        this.taskSubType === 'All Types'
          ? (taskDescription = `Throw ALL pitches in today’s ${this.flateGroundDescription.allNum} pitch flat ground with a max velocity of ${this.flateGroundDescription.allVelocity} mph.`)
          : null;
        break;
      case '4':
        taskTitle = 'bullpen';
        this.taskSubType === 'FB'
          ? (taskDescription = `Throw ALL Forkball pitches in today’s ${this.bullPenDescription.forkBallNum} pitch bullpen with a max velocity of ${this.bullPenDescription.forkBallVelocity} mph.`)
          : null;
        this.taskSubType === 'CH'
          ? (taskDescription = `Throw ALL changeup pitches in today’s ${this.bullPenDescription.changeupNum} pitch bullpen with a max velocity of ${this.bullPenDescription.changeupVelocity} mph.`)
          : null;
        this.taskSubType === 'All Types'
          ? (taskDescription = `Throw ALL pitches in today’s ${this.bullPenDescription.allNum} pitch bullpen with a max velocity of ${this.bullPenDescription.allVelocity} mph.`)
          : null;
        break;
      case '5':
        taskTitle = 'live_simulated_game & innings';
        taskDescription = `Throw a ${this.liveSimulatedDescription.innings} inning live/simulated game today, 25 pitches each inning.`;
        break;
      default:
        break;
    }
    const taskDetails = {
      taskTitle,
      taskDescription,
      taskType: this.taskType,
      taskSubType: this.taskSubType,
      innings: this.innings,
      tpDay: this.tpDay,
    };
    this.activeModal.close(taskDetails);
  }
  onTaskTransfer() {
    const taskTransferDetails = {
      taskIds: this.taskIdsToUpdate,
      tpDay: this.miscData.tp_day,
      dayToTransfer: this.dayToTransfer,
    };
    this.activeModal.close(taskTransferDetails);
  }
  onPostponeDays() {
    const postponeDetails = {
      dayToPostpone: this.dayToPostpone,
      daysForPostpone: this.daysForPostpone,
    };
    this.activeModal.close(postponeDetails);
  }
}
