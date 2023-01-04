import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

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
        z-index: 100000;
      }

      .loader {
        width: 8vh;
        height: 8vh;
        border: 3px dotted rgb(36, 36, 110);
        border-style: solid solid dotted dotted;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        animation: rotation 2s linear infinite;
      }
      .loader::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 3px dotted rgb(161, 129, 59, 1);
        border-style: solid solid dotted;
        width: 4vh;
        height: 4vh;
        border-radius: 50%;
        animation: rotationBack 1s linear infinite;
        transform-origin: center center;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes rotationBack {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(-360deg);
        }
      }
    </style>

    <div *ngIf="this.spinner.getSpinnerState()" class="spinner-container h-100">
      <div class="loader" role="status"></div>
    </div>
  `,
})
export class SpinnerComponent implements OnInit {
  constructor(public spinner: SpinnerService) {}

  ngOnInit(): void {}
}
