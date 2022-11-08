import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { OrientationComponent } from './components/orientation/orientation.component';
import { SurveyComponent } from './components/survey/survey.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
  },
  { path: 'terms', title: 'Terms of Use', canActivate: [AuthGuard], component: TermsOfUseComponent },
  { path: 'orientation', title: 'Orientation', canActivate: [AuthGuard], component: OrientationComponent },
  { path: 'survey', title: 'Survey', canActivate: [AuthGuard], component: SurveyComponent },
  { path: 'subscription', title: 'Subscription', canActivate: [AuthGuard], component: SubscriptionComponent },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./components/dashboard/dashboard.module').then((child) => child.DashboardModule),
  },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '**', component: SplashScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
