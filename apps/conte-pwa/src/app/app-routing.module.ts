import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { TermsOfUseComponent } from './components/termsOfUse/terms-of-use/terms-of-use.component';
import { OrientationVideoComponent } from './components/shared/orientation/orientation-video/orientation-video.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  { path: '', component: SplashScreenComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'terms', component: TermsOfUseComponent },
  { path: 'orientation', component: OrientationVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
