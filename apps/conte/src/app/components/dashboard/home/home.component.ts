import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Shared/services/user.service';
import { TableHeaders } from '../../../Shared/models/Generic';

@Component({
  selector: 'conte-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allUsers: any = [];
  constructor(private UsersService: UserService) {}
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

  ngOnInit(): void {
    this.UsersService.getAllUsers().then((resp) => {
      this.allUsers = resp.data.users.map((user: any) => ({
        id: user.id,
        Name: `${user.last_name}, ${user.first_name}`,
        estimated_max_velocity: user.estimated_max_velocity,
        email: user.email,
        num_completed_tasks : user.num_completed_tasks,
        num_skipped_tasks:user.num_skipped_tasks,
      }));
    });
  }
}
