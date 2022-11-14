import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <div class="d-flex">
        <span *ngIf="toast.icon === 'success'"><i class="bi bi-check2-circle me-2 pb-1"></i></span>
        <span *ngIf="toast.icon === 'error'"><i class="bi bi-x-lg me-2 pb-1"></i></span>
        <span *ngIf="toast.icon === 'info'"><i class="bi bi-info-lg me-2 pb-1"></i></span>

        <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
          <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
        </ng-template>

        <ng-template #text
          ><span style="padding-top: 1px;">{{ toast.textOrTpl }}</span></ng-template
        >
      </div>
    </ngb-toast>
  `,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
