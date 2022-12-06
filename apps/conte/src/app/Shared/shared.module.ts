import { importProvidersFrom, NgModule } from "@angular/core";
import { TablePaginationClientComponent } from "./components/table-pagination-client/table-pagination-client.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from "./components/toast/toast.component";


@NgModule({
  declarations: [
    TablePaginationClientComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TablePaginationClientComponent,
    NgxPaginationModule,
    NgbModule,
    ToastComponent
  ],
})
export class SharedModule {}
