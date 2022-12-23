/* modules */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* components */
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { UserManagmentComponent } from './home/user-managment.component';
import { TreatmentplansComponent } from './treatment-plans/treatmentplans.component';
import { UserTreatmentPlanComponent } from './user-treatment-plan/user-treatment-plan.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'user-management', title: 'Home', component: UserManagmentComponent },
      { path: 'treatment-plans', title: 'Treatment Plan', component: TreatmentplansComponent },
      { path: 'user-treatment', title: 'User Treatment Plan', component: UserTreatmentPlanComponent },
    ],
  },
];

@NgModule({
    declarations: [
        DashboardComponent,
        UserManagmentComponent,
        TreatmentplansComponent,
        UserTreatmentPlanComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ]
})
export class DashboardModule {}
