import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../shared/services/treatmentPlan.service';
import { TreatmentPlan } from '../../../shared/models/TreatmentPlan';
import { TableHeaders } from '../../../shared/models/Generic';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { TECHNICAL_DIFFICULTIES } from '../../../shared/utils/constants';

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
  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private router: Router,
    private toast: ToastService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchTreatmentPlan();
  }

  fetchTreatmentPlan = (): void => {
    this.spinner.show();
    this.treatmentPlanService
      .getTreatmentPlans()
      .then((resp) => {
        this.treatmentPlans = resp.data.map((plan: TreatmentPlan) => ({
          id: plan.id,
          name: plan.name,
          surgery_id: plan.surgery_id,
          doctor_id: plan.doctor_id,
          createdAt: plan.createdAt,
        }));
        this.spinner.hide();
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
        this.spinner.hide();
      });
  };

  onRowClick = (record: any): void => {
    this.spinner.show();
    this.treatmentPlanService
      .getTreatmentPlanDetails(record.id)
      .then((resp) => {
        this.treatmentPlanService.clearUserTreatmentPlanData();
        this.treatmentPlanService.userTreatmentPlanDataForTp.id = resp.data.id;
        this.treatmentPlanService.userTreatmentPlanDataForTp.name = resp.data.name;
        this.treatmentPlanService.userTreatmentPlanDataForTp.createdAt = resp.data.createdAt;
        this.treatmentPlanService.userTreatmentPlanDataForTp.TreatmentPlanDetails = resp.data.TreatmentPlanDetails;
        this.router.navigate(['dashboard/user-treatment']);
        this.spinner.hide();
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
        this.spinner.hide();
      });
  };
}
