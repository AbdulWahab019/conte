/* Modules */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

/* Components */
import { GenericModalComponent } from '../shared/modals/generic/generic-modal.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { ToastComponent } from '../shared/toast/toast.component';

@NgModule({
  declarations: [GenericModalComponent, ToastComponent, SpinnerComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    NgxPaginationModule,
  ],
  exports: [GenericModalComponent, ToastComponent, SpinnerComponent],
})
export class SharedModule {}
