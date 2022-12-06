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

  idSpecificData: { id: number; data: any }[] = [];

  constructor(private treatmentPlanService: TreatmentPlanService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  expanssionToggle(record: any) {
    if (record.expanssion === true) {
      record.expanssion = false;
    } else {
      this.treatmentPlanService.getTasks(record.id).then((resp) => {
        const match = this.idSpecificData.find((item) => item.id === record.id);

        if (!match) {
          this.idSpecificData.push({ id: record.id, data: resp.data });
        }
      });
      record.expanssion = true;
    }
  }
}
