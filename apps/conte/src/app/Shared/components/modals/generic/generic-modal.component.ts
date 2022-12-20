import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { UserService } from '../../../services/user.service';
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
  @Input() form = [];
  @Input() listActionText = '';
  @Input() listActionLogo = '';
  @Input() listAction!: (args: any) => void;
  @Input() listSecActionText = '';
  @Input() listSecActionLogo = '';
  @Input() listSecAction!: (args: any, secArgs: any) => void;
  @Input() questionAnswers: taskFeedback[] = [];
  @Input() QAbuttonText = '';
  @Input() QAbuttonLogo = '';
  @Input() buttonText = '';
  @Input() buttonLoadingText = '';
  @Input() buttonAction!: (args: any) => void;
  @Input() closeButtonText = '';
  @Input() miscData: any;

  buttonState = 'static';
  secButtonState = 'static';
  title = '';

  constructor(public activeModal: NgbActiveModal, private toast: ToastService, private userService: UserService) {}

  ngOnInit(): void {}

  async buttonFunction() {
    if (this.buttonLoadingText) {
      this.buttonState = 'loading';
      await delay(1500);
    }

    if (this.questionAnswers?.length) {
      for (const question of this.questionAnswers) {
        if (!question.answer) {
          this.toast.show('Please answer every question first.', { classname: 'bg-danger text-light', icon: 'error' });
          this.buttonState = 'static';
          return;
        }
      }
      const data = { QA: this.questionAnswers, task_id: this.miscData };
      this.buttonAction(data);
    }

    this.activeModal.close();
  }

  addQuestion() {
    this.questionAnswers.push({ question: '', answer: '' });
  }

  removeQuestion(index: number) {
    this.questionAnswers.splice(index, 1);
  }
  onSubmit() {
    const data = { data: { title: this.form.toString() } };
    this.userService
      .updateTask(this.miscData.userId, this.miscData.taskId, data)
      .then((resp: any) => {
        this.activeModal.close(this.form);
      })
      .catch((err) => {
        this.buttonState = 'static';
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
