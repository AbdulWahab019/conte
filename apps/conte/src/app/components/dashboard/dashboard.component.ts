import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/services/user.service';
import { TableHeaders } from '../../Shared/models/Generic';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  url = '';
  allUsers: any = [];

  orderTableHeaders: TableHeaders[] = [
    { title: 'id', value: 'id', sort: true, orderBy: '' },
    {
      title: 'Name',
      value: 'Name',
      sort: true,
      orderBy: '',
    },
    { title: 'estimated_max_velocity', value: 'estimated_max_velocity', sort: true, orderBy: '' },
    { title: 'email', value: 'email', sort: true, orderBy: '' },
  ];
  constructor(private router: Router, private UsersService: UserService) {}
  ngOnInit(): void {
    this.UsersService.getAllUsers().then((resp) => {
      this.allUsers = resp.data.users.map((order: any) => ({
        id: order.id,
        Name: `${order.last_name}, ${order.first_name}`,
        estimated_max_velocity: order.estimated_max_velocity,
        email: order.email,
      }));
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    // this.spinner.show();
    // await delay(1000);
    // this.spinner.hide();
    // this.toast.show('Logged out successfully.', { classname: 'bg-success text-light', icon: 'success' });
  }
}
