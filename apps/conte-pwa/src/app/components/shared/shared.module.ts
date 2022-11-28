/* Modules */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

/* Components */
import { GenericModalComponent } from '../shared/modals/generic/generic-modal.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { CountDownComponent } from './count-down/count-down.component';

@NgModule({
  declarations: [GenericModalComponent, ToastComponent, SpinnerComponent, CountDownComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, NgbModule, CommonModule],
  exports: [ToastComponent, SpinnerComponent, CountDownComponent],
})
export class SharedModule {}
