import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';

@Component({
  selector: 'conte-treatmentplans',
  templateUrl: './treatmentplans.component.html',
  styleUrls: ['./treatmentplans.component.scss'],
})
export class TreatmentplansComponent implements OnInit {
  treatmentplans: any = [];
  tableHeaders: any = [
    { title: 'id', value: 'id', sort: false },
    {
      title: 'name',
      value: 'name',
      sort: false,
    },
    { title: 'surgery id', value: 'surgery_id', sort: false },
    { title: 'doctor id', value: 'doctor_id', sort: false },
    { title: 'created at', value: 'createdAt', sort: false },
  ];
  constructor(private treatmentPlanService : TreatmentPlanService) {}

  ngOnInit(): void {
    this.treatmentPlanService.getTreatmentPlans().then((resp) => {
      this.treatmentplans = resp.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        surgery_id: user.surgery_id,
        doctor_id: user.doctor_id,
        createdAt : user.createdAt,
      }));
    });
  }
}
