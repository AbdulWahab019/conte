/* modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* components */
import { ToastComponent } from './components/toast/toast.component';
import { GenericModalComponent } from './components/modals/generic/generic-modal.component';
import { TablePaginationClientComponent } from './components/table-pagination-client/table-pagination-client.component';

@NgModule({
  declarations: [TablePaginationClientComponent, ToastComponent, GenericModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [TablePaginationClientComponent, ToastComponent, GenericModalComponent],
})
export class SharedModule {}
