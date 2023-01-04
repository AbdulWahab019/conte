import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../shared/services/treatmentPlan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GenericModalComponent } from '../../../shared/components/modals/generic/generic-modal.component';
import { ToastService } from '../../../shared/services/toast.service';
import { TreatmentPlanTaskDetailsForTp } from '../../../shared/models/TreatmentPlan';
import { UserService } from '../../../shared/services/user.service';
import { TECHNICAL_DIFFICULTIES } from '../../../shared/utils/constants';

@Component({
  selector: 'conte-user-treatment-plan',
  templateUrl: './user-treatment-plan.component.html',
  styleUrls: ['./user-treatment-plan.component.scss'],
})
export class UserTreatmentPlanComponent implements OnInit {
  name = '';
  createdAt = '';
  TreatmentPlanDetails: TreatmentPlanTaskDetailsForTp[] = [];
  modal: any;
  userId = '';
  treatmentPlanData: any;

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private userService: UserService,
    private modalService: NgbModal,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserTpData();
  }

  fetchUserTpData() {
    if (this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan) {
      this.treatmentPlanData = {
        completedTasks: this.treatmentPlanService.userTreatmentPlanData.completed_tasks,
        pendingTasks: this.treatmentPlanService.userTreatmentPlanData.pending_tasks,
        skippedTasks: this.treatmentPlanService.userTreatmentPlanData.skipped_tasks,
        userTreatmentPlan: this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan,
        details: this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan.details,
      };
    } else if (this.treatmentPlanService.userTreatmentPlanDataForTp.name) {
      this.treatmentPlanData = {
        id: this.treatmentPlanService.userTreatmentPlanDataForTp.id,
        name: this.treatmentPlanService.userTreatmentPlanDataForTp.name,
        createdAt: this.treatmentPlanService.userTreatmentPlanDataForTp.createdAt,
        details: this.treatmentPlanService.userTreatmentPlanDataForTp.TreatmentPlanDetails,
      };
      this.treatmentPlanData.details.forEach((element: TreatmentPlanTaskDetailsForTp) => {
        element.is_uploading = false;
      });
    } else {
      this.toast.show('Unable to fetch task data', { classname: 'bg-danger text-light', icon: 'error' });
      this.router.navigate(['dashboard/treatment-plans']);
    }
  }

  reloadServiceData(userId: number) {
    this.userService
      .getTreatmentPlanDetails(userId)
      .then((resp) => {
        this.treatmentPlanService.clearUserTreatmentPlanDataForTp();
        this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan = resp.data;

        this.treatmentPlanService
          .getTasks(userId)
          .then((response) => {
            this.treatmentPlanService.userTreatmentPlanData.completed_tasks = response.data.is_completed;
            this.treatmentPlanService.userTreatmentPlanData.pending_tasks = response.data.is_pending;
            this.treatmentPlanService.userTreatmentPlanData.skipped_tasks = response.data.is_skipped;
            this.treatmentPlanData = {
              userTreatmentPlan: resp.data,
              details: resp.data.details,
              completedTasks: response.data.is_completed,
              pendingTasks: response.data.is_pending,
              skippedTasks: response.data.is_skipped,
            };
          })
          .catch((err) => {
            this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
              classname: 'bg-danger text-light',
              icon: 'error',
            });
          });
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }

  reloadServiceDataForTp(userId: number) {
    this.treatmentPlanService
      .getTreatmentPlanDetails(userId)
      .then((resp) => {
        this.treatmentPlanService.clearUserTreatmentPlanData();
        this.treatmentPlanService.userTreatmentPlanDataForTp.id = resp.data.id;
        this.treatmentPlanService.userTreatmentPlanDataForTp.name = resp.data.name;
        this.treatmentPlanService.userTreatmentPlanDataForTp.createdAt = resp.data.createdAt;
        this.treatmentPlanService.userTreatmentPlanDataForTp.TreatmentPlanDetails = resp.data.TreatmentPlanDetails;
        this.treatmentPlanData = {
          id: this.treatmentPlanService.userTreatmentPlanDataForTp.id,
          name: this.treatmentPlanService.userTreatmentPlanDataForTp.name,
          createdAt: this.treatmentPlanService.userTreatmentPlanDataForTp.createdAt,
          details: this.treatmentPlanService.userTreatmentPlanDataForTp.TreatmentPlanDetails,
        };
        this.treatmentPlanData.details.forEach((element: TreatmentPlanTaskDetailsForTp) => {
          element.is_uploading = false;
        });
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }

  updateTask = (userId: number, task?: any): void => {
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
          this.reloadServiceData(userId);
        }
      })
      .catch((err: any) => {});
  };

  updateVideo = async (file: any, tpDay: any) => {
    const resp = await this.treatmentPlanService.uploadVideo(file);
    this.treatmentPlanService.updateTask({ video_url: resp.data.url }, tpDay, this.treatmentPlanData.id).then(() => {
      this.toast.show('Video uploaded successfully', { classname: 'bg-success text-light', icon: 'success' });
      this.reloadServiceDataForTp(this.treatmentPlanData.id);
    });
  };
}
