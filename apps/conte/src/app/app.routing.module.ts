import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'dashboard',
    title: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./components/dashboard/dashboard.module').then((child) => child.DashboardModule),
  },
  { path: '**', component: AuthenticationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
