import { Component, Input, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../services/treatmentPlan.service';
import { TableHeaders } from '../../models/Generic';

@Component({
  selector: 'app-table-pagination-client',
  templateUrl: './table-pagination-client.component.html',
  styleUrls: ['./table-pagination-client.component.scss'],
})
export class TablePaginationClientComponent implements OnInit {
  @Input() headers: TableHeaders[] = [];
  @Input() data: any = [];

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
