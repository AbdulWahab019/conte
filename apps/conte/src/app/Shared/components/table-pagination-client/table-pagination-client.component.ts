import { Component, Input, OnInit, Output } from '@angular/core';
import { TreatmentPlanService } from '../../services/treatmentPlan.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TableHeaders } from '../../models/Generic';
import { ToastService } from '../../../Shared/services/toast.service';
import { EventEmitter } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { TECHNICAL_DIFFICULTIES } from '../../utils/constants';

@Component({
  selector: 'app-table-pagination-client',
  templateUrl: './table-pagination-client.component.html',
  styleUrls: ['./table-pagination-client.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class TablePaginationClientComponent implements OnInit {
  @Input() headers: TableHeaders[] = [];
  @Input() data: any = [];
  @Input() tableExpansion: boolean = false;
  @Input() openModal: boolean = false;
  @Input() tableEditable: boolean = false;
  @Output() readonly modalData = new EventEmitter<any>();
  @Input() modalToggle: (args: any) => void = () => null;
  @Input() onRowClick: (args: any) => void = () => null;
  @Input() onGoBack: () => void = () => null;
  @Input() onCsvFileUpdate: (args: any) => void = () => null;
  @Input() csvFileName: string = '';
  showFilters = true;
  tableData: { id: number; data: any }[] = [];
  doctors: { id: number; name: string; position: string }[] = [];
  surgery: { id: number; name: string }[] = [];
  tpData: { doctorId: number; doctorName: string; surgeryId: number } = { doctorId: 0, doctorName: '', surgeryId: 0 };
  @Output() readonly tpUpdateData = new EventEmitter<any>();

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private toast: ToastService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    if (this.tableEditable) {
      this.treatmentPlanService
        .getAllDoctors()
        .then((res: any) => {
          this.doctors = res.data;
        })
        .catch((err) => {
          this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
            classname: 'bg-danger text-light',
            icon: 'error',
          });
          this.spinner.hide();
        });
    }
  }

  onDoctorChange(record: any) {
    const docObject = this.doctors.find((x) => x.id === Number(record.value));
    if (docObject) {
      this.tpData.doctorId = docObject.id;
      this.tpData.doctorName = docObject.name;
    }
    this.treatmentPlanService
      .getSurgeries(record.value)
      .then((res: any) => {
        this.surgery = res.data;
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
        this.spinner.hide();
      });
  }

  onSurgeryChange(record: any) {
    this.tpData.surgeryId = record.value;
    this.tpUpdateData.emit(this.tpData);
  }

  expansionToggle(record: any) {
    if (record.expansion === true) {
      record.expansion = false;
    } else {
      this.treatmentPlanService
        .getTasks(record.id)
        .then((resp) => {
          const match = this.tableData.find((item) => item.id === record.id);

          if (!match) {
            this.tableData.push({ id: record.id, data: resp.data });
          }
        })
        .catch((err) => {
          this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
            classname: 'bg-danger text-light',
            icon: 'error',
          });
          this.spinner.hide();
        });
      record.expansion = true;
    }
  }
}
