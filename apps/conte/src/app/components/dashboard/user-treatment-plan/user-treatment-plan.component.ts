import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { UserService } from '../../../Shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from '../../../Shared/components/modals/generic/generic-modal.component';

@Component({
  selector: 'conte-user-treatment-plan',
  templateUrl: './user-treatment-plan.component.html',
  styleUrls: ['./user-treatment-plan.component.scss'],
})
export class UserTreatmentPlanComponent implements OnInit {
  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}
  completedTasks: [] = [];
  pendingTasks: [] = [];
  skippedTasks: [] = [];
  userTreatmentPlan: any;
  modal: any;
  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.treatmentPlanService.getTasks('59').then((resp) => {
      this.completedTasks = resp.data.completed_tasks;
      this.pendingTasks = resp.data.pending_tasks;
      this.skippedTasks = resp.data.skipped_tasks;
    });
    this.userService.getTreatmentPlanDetails('59').then((resp) => {
      this.userTreatmentPlan = resp.data;
    });
  }
  updateTask = (userId: any, task: any): void => {
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
          this.fetchTasks();
        }
      })
      .catch((err: any) => {
        
      });
  };
}
