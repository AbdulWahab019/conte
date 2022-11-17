import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';

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
  @Input() listActionText = '';
  @Input() listActionLogo = '';
  @Input() questionAnswers: taskFeedback[] = [];
  @Input() QAbuttonText = '';
  @Input() QAbuttonLogo = '';
  @Input() listAction!: (args: any) => void;
  @Input() buttonText = '';
  @Input() buttonLoadingText = '';
  @Input() buttonAction!: (args: any) => void;
  @Input() closeButtonText = '';

  buttonState = 'static';
  secButtonState = 'static';

  constructor(public activeModal: NgbActiveModal, private toast: ToastService) {}

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
      this.buttonAction(this.questionAnswers);
    }
    this.activeModal.close();
  }

  addQuestion() {
    this.questionAnswers.push({ question: '', answer: '' });
  }

  removeQuestion(index: number) {
    this.questionAnswers.splice(index, 1);
  }
}
