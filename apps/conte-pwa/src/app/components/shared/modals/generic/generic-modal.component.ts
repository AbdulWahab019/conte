import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { taskFeedback } from 'apps/conte-pwa/src/app/models/treatmentplan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { PaginationInstance } from 'ngx-pagination';
import { TreatmentPlanService } from 'apps/conte-pwa/src/app/services/treatment-plan.service';

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
  @Input() listAction!: (args: any) => void;
  @Input() listSecActionText = '';
  @Input() listSecActionLogo = '';
  @Input() listSecAction!: (args: any, secArgs: any) => void;
  @Input() feedback = false;
  @Input() questionAnswers: taskFeedback[] = [];
  @Input() QAbuttonText = '';
  @Input() QAbuttonLogo = '';
  @Input() buttonText = '';
  @Input() buttonLoadingText = '';
  @Input() buttonAction!: (args: any) => void;
  @Input() closeButtonText = '';
  @Input() miscData: any;

  config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  buttonState = 'static';
  secButtonState = 'static';

  constructor(
    public activeModal: NgbActiveModal,
    public treatmentPlanService: TreatmentPlanService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.list.length) {
      this.config = { id: '', itemsPerPage: 0, currentPage: 0 };
    }
  }

  async buttonFunction() {
    if (this.buttonLoadingText) {
      this.buttonState = 'loading';
      await delay(1500);
    }

    if (this.questionAnswers?.length) {
      for (const question of this.questionAnswers) {
        if (!question.answer) {
          this.toast.show('Please fill out the form completely, first.', {
            classname: 'bg-danger text-light',
            icon: 'error',
          });
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
}
