import { Component, Input, OnInit, Output } from '@angular/core';
import { TreatmentPlanService } from '../../services/treatmentPlan.service';
import { TableHeaders } from '../../models/Generic';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-pagination-client',
  templateUrl: './table-pagination-client.component.html',
  styleUrls: ['./table-pagination-client.component.scss'],
})
export class TablePaginationClientComponent implements OnInit {
  @Input() headers: TableHeaders[] = [];
  @Input() data: any = [];
  @Input() tableExpansion: boolean = false;
  @Input() openModal: boolean = false;
  @Input() tableEditable: boolean = false;
  @Output() modalData = new EventEmitter<any>();
  @Input() modalToggle: (args: any) => void = () => null;
  @Input() onRowClick: (args: any) => void = () => null;
  @Input() onGoBack: () => void = () => null;
  @Input() onCsvFileUpdate: (args: any) => void = () => null;
  @Input() csvFileName: string = '';
  tableData: { id: number; data: any }[] = [];
  doctors: { id: number; name: string; position: string }[] = [];
  surgery: { id: number; name: string }[] = [];
  tpData: { doctorId: number; doctorName: string; surgeryId: number } = { doctorId: 0, doctorName: '', surgeryId: 0 };
  @Output() tpUpdateData = new EventEmitter<any>();

  constructor(private treatmentPlanService: TreatmentPlanService) {}

  ngOnInit(): void {
    if (this.tableEditable) {
      this.treatmentPlanService.getAllDoctors().then((res: any) => {
        this.doctors = res.data;
      });
    }
  }

  ngOnChanges(): void {}

  onDoctorChange(record: any) {
    const docObject = this.doctors.find((x) => x.id == record.value);
    if (docObject) {
      this.tpData.doctorId = docObject.id;
      this.tpData.doctorName = docObject.name;
    }
    this.treatmentPlanService.getSurgeries(record.value).then((res: any) => {
      this.surgery = res.data;
    });
  }

  onSurgeryChange(record: any) {
    console.log(record.value);
    this.tpData.surgeryId = record.value;
    this.tpUpdateData.emit(this.tpData);
  }

  expansionToggle(record: any) {
    if (record.expansion === true) {
      record.expansion = false;
    } else {
      this.treatmentPlanService.getTasks(record.id).then((resp) => {
        const match = this.tableData.find((item) => item.id === record.id);

        if (!match) {
          this.tableData.push({ id: record.id, data: resp.data });
        }
      });
      record.expansion = true;
    }
  }
}
