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
  @Input() form = [];
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

    this.activeModal.close();
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
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }
}
