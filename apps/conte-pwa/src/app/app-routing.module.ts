import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { OrientationComponent } from './components/orientation/orientation.component';
import { SurveyComponent } from './components/survey/survey.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TreatmentPlanComponent } from './components/dashboard/treatment-plan/treatment-plan.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'terms', title: 'Terms of Use', component: TermsOfUseComponent },
  { path: 'orientation', title: 'Orientation', component: OrientationComponent },
  { path: 'survey', title: 'Survey', component: SurveyComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'dashboard/treatment-plan', title: 'Treatment Plan', component: TreatmentPlanComponent },
  { path: '**', component: SplashScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
