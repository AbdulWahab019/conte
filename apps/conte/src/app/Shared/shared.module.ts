/* modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* components */
import { ToastComponent } from './components/toast/toast.component';
import { GenericModalComponent } from './components/modals/generic/generic-modal.component';
import { TablePaginationClientComponent } from './components/table-pagination-client/table-pagination-client.component';
import { TreatmentPlanTableComponent } from './components/treatment-plan-table/treatment-plan-table/treatment-plan-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    TablePaginationClientComponent,
    ToastComponent,
    GenericModalComponent,
    TreatmentPlanTableComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [
    TablePaginationClientComponent,
    ToastComponent,
    GenericModalComponent,
    TreatmentPlanTableComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
