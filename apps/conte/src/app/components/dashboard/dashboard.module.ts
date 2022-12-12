import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../Shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserManagmentComponent } from './home/user-managment.component';
import { TreatmentplansComponent } from './treatmentplans/treatmentplans.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', title: 'Home', component: UserManagmentComponent },
      { path: 'treatment-plans', title: 'Treatment Plan', component: TreatmentplansComponent },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, UserManagmentComponent, TreatmentplansComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule, DashboardComponent, NavbarComponent],
})
export class DashboardModule {}
