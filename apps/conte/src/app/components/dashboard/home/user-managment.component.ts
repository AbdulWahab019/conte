import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Shared/services/user.service';
import { TableHeaders } from '../../../Shared/models/Generic';

@Component({
  selector: 'conte-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss'],
})
export class UserManagmentComponent implements OnInit {
  users: any = [];
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

  constructor(private UsersService: UserService) {}

  ngOnInit(): void {
    this.UsersService.getAllUsers().then((resp) => {
      this.users = resp.data.users.map((user: any) => ({
        id: user.id,
        Name: `${user.last_name}, ${user.first_name}`,
        estimated_max_velocity: user.estimated_max_velocity,
        email: user.email,
        num_completed_tasks: user.num_completed_tasks,
        num_skipped_tasks: user.num_skipped_tasks,
      }));
    });
  }
}
