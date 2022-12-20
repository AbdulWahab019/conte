import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Shared/services/user.service';
import { TableHeaders } from '../../../Shared/models/Generic';
import { Router } from '@angular/router';
import { User } from '../../../Shared/models/User';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { ToastService } from '../../../Shared/services/toast.service';

@Component({
  selector: 'conte-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss'],
})
export class UserManagmentComponent implements OnInit {
  usersTableData: User[] = [];
  tableHeaders: TableHeaders[] = [
    { title: 'id', value: 'id', sort: false },
    {
      title: 'Name',
      value: 'Name',
      sort: false,
    },
    { title: 'estimated max velocity', value: 'estimated_max_velocity', sort: false },
    { title: 'email', value: 'email', sort: false },
    { title: 'skipped tasks', value: 'num_skipped_tasks', sort: false },
    { title: 'completed tasks', value: 'num_completed_tasks', sort: false },
  ];

  constructor(
    private UsersService: UserService,
    private router: Router,
    private treatmentPlanService: TreatmentPlanService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers = () => {
    this.UsersService.getAllUsers().then((resp) => {
      this.usersTableData = resp.data.users.map((user: any) => ({
        id: user.id,
        name: `${user.last_name}, ${user.first_name}`,
        estimated_max_velocity: user.estimated_max_velocity,
        email: user.email,
        num_completed_tasks: user.num_completed_tasks,
        num_skipped_tasks: user.num_skipped_tasks,
      }));
    });
  };
  onRowClick = (record: User) => {
    this.UsersService.getTreatmentPlanDetails(record.id)
      .then((resp) => {
        this.treatmentPlanService.userTreatmentPlanData.userTreatmentPlan = resp.data;
        this.treatmentPlanService
          .getTasks(record.id)
          .then((response) => {
            this.treatmentPlanService.userTreatmentPlanData.completed_tasks = response.data.completed_tasks;
            this.treatmentPlanService.userTreatmentPlanData.pending_tasks = response.data.pending_tasks;
            this.treatmentPlanService.userTreatmentPlanData.skipped_tasks = response.data.skipped_tasks;
            this.router.navigate(['dashboard/user-treatment']);
          })
          .catch((err) => {
            this.toast.show(err?.error?.message, { classname: 'bg-danger text-light', icon: 'error' });
          });
      })
      .catch((err) => {
        this.toast.show(err?.error?.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  };
}
