import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../../Shared/services/user.service';
import { UserTableData } from '../../Shared/models/UserTableData';


@Component({
  selector: 'conte-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  url = '';
  allUsers : UserTableData[] = [];
  constructor(private router: Router,private UsersService : UserService) {}
  ngOnInit(): void {
    this.UsersService.getAllUsers().then((resp)=>{
      this.allUsers = resp.data.users;
    })
}
}