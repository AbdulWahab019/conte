/* Environment */
import { environment } from '../environments/environment';

/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';

/* Interceptors */
import { AuthInterceptor } from './interceptors/auth.interceptor';

/* Components */
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { OrientationComponent } from './components/orientation/orientation.component';
import { SurveyComponent } from './components/survey/survey.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TreatmentPlanComponent } from './components/dashboard/treatment-plan/treatment-plan.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    AuthenticationComponent,
    ToastComponent,
    TermsOfUseComponent,
    OrientationComponent,
    SurveyComponent,
    DashboardComponent,
    TreatmentPlanComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPullToRefreshModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgbModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
