import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'apps/conte-pwa/src/app/utils/constants';

@Component({
  selector: 'conte-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
export class GenericModalComponent implements OnInit {
  @Input() heading = '';
  @Input() logo = '';
  @Input() body = '';
  @Input() list = [];
  @Input() listActionText = '';
  @Input() listActionLogo = '';
  @Input() listAction!: (args: any) => void;
  @Input() buttonText = '';
  @Input() buttonLoadingText = '';
  @Input() buttonAction!: () => void;
  buttonState = 'static';

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  async buttonFunction() {
    if (this.buttonLoadingText) {
      this.buttonState = 'loading';
      await delay(1500);
    }
    this.activeModal.close();
  }
}
