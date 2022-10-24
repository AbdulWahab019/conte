import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'conte-spinner',
  template: `
    <style>
      .spinner-container {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 10;
      }

      .spinner-border {
        height: 10vh;
        width: 10vh;
      }
    </style>

    <div *ngIf="this.spinnerService.getSpinnerState()" class="spinner-container h-100">
      <div class="spinner-border" role="status"></div>
    </div>
  `,
})
export class SpinnerComponent implements OnInit {
  constructor(public spinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
