/* Modules */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { TreatmentPlanComponent } from './treatment-plan/treatment-plan.component';
import { TaskDetailsComponent } from './treatment-plan/task-details/task-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', title: 'Home', component: HomeComponent },
      { path: 'contact', title: 'Contact Us', component: ContactUsComponent },
      { path: 'treatment-plan', title: 'Treatment Plan', component: TreatmentPlanComponent },
    ],
  },
];

@NgModule({
  declarations: [ContactUsComponent, TaskDetailsComponent, TreatmentPlanComponent, HomeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
