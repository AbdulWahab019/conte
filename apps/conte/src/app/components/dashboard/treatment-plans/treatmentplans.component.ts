import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { GenericModalComponent } from '../../../Shared/components/modals/generic/generic-modal.component';

@Component({
  selector: 'conte-treatmentplans',
  templateUrl: './treatmentplans.component.html',
  styleUrls: ['./treatmentplans.component.scss'],
})
export class TreatmentplansComponent implements OnInit {
  treatmentPlans: any = [];
  modal: any;
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
  constructor(private treatmentPlanService: TreatmentPlanService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.treatmentPlanService.getTreatmentPlans().then((resp) => {
      this.treatmentPlans = resp.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        surgery_id: user.surgery_id,
        doctor_id: user.doctor_id,
        createdAt: user.createdAt,
      }));
    });
  }
  modalToggle = (record: any): void => {
    this.modal = this.modalService.open(GenericModalComponent, { centered: true });
    this.modal.heading = '';
    this.modal.form = true;
  };
}
