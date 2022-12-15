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
  @Output() modalData = new EventEmitter<any>();
  @Input() modalToggle: (args: any) => void = () => null;
  @Input() onRowClick: (args: any) => void = () => null;
  tableData: { id: number; data: any }[] = [];
  constructor(private treatmentPlanService: TreatmentPlanService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

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
