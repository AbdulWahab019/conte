import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { GenericModalComponent } from '../../../Shared/components/modals/generic/generic-modal.component';
import { TreatmentPlan } from '../../../Shared/models/TreatmentPlan';
import { TableHeaders } from '../../../Shared/models/Generic';

@Component({
  selector: 'conte-treatmentplans',
  templateUrl: './treatmentplans.component.html',
  styleUrls: ['./treatmentplans.component.scss'],
})
export class TreatmentplansComponent implements OnInit {
  treatmentPlans: TreatmentPlan[] = [];
  treatmentPlanModalRef: any;
  tableHeaders: TableHeaders[] = [
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
  constructor(private treatmentPlanService: TreatmentPlanService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchTreatmentPlan();
  }
  fetchTreatmentPlan = ():void =>{
    this.treatmentPlanService.getTreatmentPlans().then((resp) => {
      this.treatmentPlans = resp.data.map((plan: TreatmentPlan) => ({
        id: plan.id,
        name: plan.name,
        surgery_id: plan.surgery_id,
        doctor_id: plan.doctor_id,
        createdAt: plan.createdAt,
      }));
    });
  }
  modalToggle = (record: any): void => {
    this.treatmentPlanModalRef = this.modalService.open(GenericModalComponent, { centered: true });
    this.treatmentPlanModalRef.heading = '';
    this.treatmentPlanModalRef.form = true;
  };
}
