import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../Shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TreatmentplansComponent } from './treatmentplans/treatmentplans.component';

const serverErrorsRegex = new RegExp(
  `500 Internal Server Error|400 Bad Request|401 Unauthorized|403 Forbidden|404 Not Found|502 Bad Gateway|503 Service Unavailable`,
  'mi'
);

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'users', title: 'Home', component: HomeComponent },
      { path: 'treatment-plans', title: 'treatment-plan', component: TreatmentplansComponent },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, HomeComponent, TreatmentplansComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule, DashboardComponent, NavbarComponent],
})
export class DashboardModule {}
