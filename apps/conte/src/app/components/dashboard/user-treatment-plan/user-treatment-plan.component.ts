import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { UserService } from '../../../Shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GenericModalComponent } from '../../../Shared/components/modals/generic/generic-modal.component';
import { Task } from '../../../Shared/models/TreatmentPlan';
import { TreatmentPlanDetails } from '../../../Shared/models/TreatmentPlan';
import { ToastService } from '../../../Shared/services/toast.service';

@Component({
  selector: 'conte-user-treatment-plan',
  templateUrl: './user-treatment-plan.component.html',
  styleUrls: ['./user-treatment-plan.component.scss'],
})
export class UserTreatmentPlanComponent implements OnInit {
  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private userService: UserService,
    private modalService: NgbModal,
    private toast : ToastService,
    private router: Router,
  ) {}
  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];
  skippedTasks: Task[] = [];
  userTreatmentPlan: TreatmentPlanDetails = {} as TreatmentPlanDetails;
  modal: any;
  userId = '';

  ngOnInit(): void {
    this.fetchUserTpData();
  }

  fetchUserTpData() {
    if(this.treatmentPlanService.userTreatmentPlanData){
    this.completedTasks = this.treatmentPlanService.userTreatmentPlanData.completed_tasks;
    this.pendingTasks = this.treatmentPlanService.userTreatmentPlanData.pending_tasks;
    this.skippedTasks = this.treatmentPlanService.userTreatmentPlanData.skipped_tasks;
    this.userTreatmentPlan = this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan;
  }else{
    this.toast.show("Unable to fetch task data", { classname: 'bg-danger text-light', icon: 'error' });
    this.router.navigate(['dashboard/user-managment']);
  }
  
}

  updateTask = (userId?: number, task?: any): void => {
    const ids = {
      userId,
      taskId: task.id,
    };
    this.modal = this.modalService.open(GenericModalComponent, { centered: true });
    this.modal.componentInstance.heading = 'Update Task';
    this.modal.componentInstance.form = task.title;
    this.modal.componentInstance.miscData = ids;
    this.modal.result
      .then((result: any) => {
        if (result) {
          this.fetchUserTpData();
        }
      })
      .catch((err: any) => {});
  };
}
