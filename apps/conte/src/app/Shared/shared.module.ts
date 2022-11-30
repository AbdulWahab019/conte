import { importProvidersFrom, NgModule } from "@angular/core";
import { TablePaginationClientComponent } from "./components/table-pagination-client/table-pagination-client.component";
import { customFieldFormatPipe } from "./Pips/custom-field-format.pipe";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TablePaginationClientComponent,
    customFieldFormatPipe
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
    NgbModule
  ],
})
export class SharedModule {}
